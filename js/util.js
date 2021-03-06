/**
 * ===========================================================================
 * File: util.js 
 * Author: Antonio Faienza
 * This file is create a function util 
 * ===========================================================================
 */


/**
 * Convert day of week into integer
 * @param {integer} d - number of day 
 */
function defineDayNumber(d) {
    var day = 0;
    if (d == 'Monday') {
        day = 1;
    } else if (d == 'Tuesday') {
        day = 2;
    } else if (d == 'Wednesday') {
        day = 3;
    } else if (d == 'Thursday') {
        day = 4;
    } else if (d == 'Friday') {
        day = 5;
    }

    return day;
}

/**
 * Convert day of week into String
 * @param {String} d - day of week
 */
function defineDayString(d) {
    var day = 'Monday';
    if (d == 1) {
        day = 'Monday';
    } else if (d == 2) {
        day = 'Tuesday';
    } else if (d == 3) {
        day = 'Wednesday';
    } else if (d == 4) {
        day = 'Thursday';
    } else if (d == 5) {
        day = 'Friday';
    }

    return day;
}

/**
 * Generate Random Day from array previusly deleting a specific day.
 * If @toRemove is undefined it not delete nothing day
 * @param {String} toRemove - day to remove
 */
function generateDayByExcludingOne(toRemove = undefined) {
    var daysTemp = days.slice();

    if (toRemove != null) {
        var index = daysTemp.indexOf(toRemove);
        if (index > -1) {
            daysTemp.splice(index, 1);
        }
    }
    var randomDay = daysTemp[Math.floor(Math.random() * daysTemp.length)];
    //alert(randomDay);
    return randomDay;
}


/**
 * Generate A concescutive Day from array previusly deleting a specific day.
 * If @toRemove is undefined it not delete nothing day
 * @param {String} toRemove - day to remove
 */
function generateDayConsecutive(toRemove = undefined) {
    var daysTemp = days.slice();

    if (toRemove != null) {
        var index = daysTemp.indexOf(toRemove);
        if (index > -1) {
            daysTemp.splice(index, 1);
        }
    }
    //alert(randomDay);
    return daysTemp[0];
}

/**
 * Generate Random Classroom from array previusly deleting a specific day.
 * If @toRemove is undefined it not delete nothing day
 * @param {String} toRemove - day to remove
 */
function generateClassroom(toRemove = undefined) {
    var classroomsTemp = classrooms.slice();

    if (toRemove != null) {
        var index = classroomsTemp.indexOf(toRemove);
        if (index > -1) {
            classroomsTemp.splice(index, 1);
        }
    }

    var rClass = classroomsTemp[Math.floor(Math.random() * classroomsTemp.length)];
    return rClass;
}


/**
 * Function that spli the string into array and determinate the curriculum of discipline;
 * @param {String} str - string to split
 */
function splitCurriculum(str) {
    if (str != "NO") {
        return str.split("");
    }

}

/**
 * Function that counts number of hours of a specific course in a specific day
 * 
 */
function countHours(course, day) {
    var result = 0;
    for (var i = 0; i < timetable.tt.length; i++) {
        if (timetable.tt[i].getDiscipline().getCourse().getId() == course &&
            timetable.tt[i].getDay() == day) {
            result += timetable.tt[i].getDurationLesson();
        }
    }
    return result;
}

/**
 * Return random nnumber between two value
 * @param {Integer} min 
 * @param {Integer} max 
 */
function randomIntFromInterval(min, max) // min and max included
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Compare two array and check if has same value
 * @param {Array} ary1 
 * @param {Array} ary2 
 */
function compareArray(ary1, ary2) {
    return (ary1.join('') == ary2.join(''));
}

/**
 * Compare the number of Subscription of one course i.e IoT with the capacity of classRoom
 * It return an array only with classroom that has more capacity respect the number of Students
 * @param {Integer} numSub - number of Students subscribed to Course
 */
function checkCapacityClassroom(numSub) {
    var result = [];
    for (var i = 0; i < classrooms.length; i++) {
        if (classrooms[i].getCapacity() > numSub) {
            result.push(classrooms[i]);
        }
    }
    return result;
}

/**
 * Compare method of input chosen by professor with the blackboard of classRoom
 * It return an array only with classroom that has more capacity respect the write method
 * @param {Integer} numSub - number of Students subscribed to Course
 */
function checkBlackboardClassroom(method) {
    var result = [];
    for (var i = 0; i < classrooms.length; i++) {
        if (classrooms[i].getBlackboard() == method) {
            result.push(classrooms[i]);
        }
    }
    return result;
}
/**
 * Function that counts number of hours of a specific course in a specific day until a specific hour
 * mod
 */
function countHoursBetween(course, day, startHour, endHour) {
    var result = 0;
    for (var i = 0; i < timetable.tt.length; i++) {
        if (timetable.tt[i].getDiscipline().getCourse() == course
            && timetable.tt[i].getDay() == day
            && startHour <= timetable.tt[i].getStartLesson()
            && timetable.tt[i].getStartLesson() <= endHour
        ) {
            result += timetable.tt[i].getDurationLesson();
        }
    }
    return result;
}
/**
 * Return the professor by Id
 */
function getProfessorById(idProf) {
    var result;
    $(document).ajaxComplete(function () {

        for (var i = 0; i < professors.length; i++) {
            if (professors[i].getId() == idProf) {
                result = professors[i];
            }
        };
    }
    );
    return result;

}

/**
 * This function makes two consecutive lessons
 * @param {Lesson} l1 
 * @param {Lesson} l2
 * 
 * @method switchLesson
 */
function switchLesson(l1, l2) {
    if (l1.getStartLesson() <= l2.getStartLesson()) {

        var dL = l2.getDurationLesson();
        l2.setStartLesson(l1.getEndLesson());
        l2.setEndLesson(l2.getStartLesson() + dL);
    }
    else {
        var dL = l1.getDurationLesson();
        l1.setStartLesson(l2.getEndLesson());
        l1.setEndLesson(l1.getStartLesson() + dL);
    }

    if ((l1.getStartLesson() + l1.getDurationLesson()) >= END_LESSONS) {

        var dL = l1.getDurationLesson();
        l1.setNewDay(l1.getDay(), 1);
        l1.setStartLesson(START_LESSONS);
        l1.setEndLesson(START_LESSONS + dL);
    }
    if ((l2.getStartLesson() + l2.getDurationLesson()) >= END_LESSONS) {

        var dL = l2.getDurationLesson();
        l2.setNewDay(l2.getDay(), 1);
        l2.setStartLesson(START_LESSONS);
        l2.setEndLesson(START_LESSONS + dL);
    }

}

/**
 * Modal alert when click on the event
 * @param {event} Object
 * 
 * @method alertModal
 */
function alertModal(event) {
    
    // Header 
    $('.modal-header').find('h2').text(event.title);
    $('.modal-header').css("background", colorCategory(event.category));
    $('.modal-header').css("color", "white");

    // Content
    $('.modal-content').find('p').html(event.content);

    // Footer
    $('.modal-footer').find('p').text(event.category);
    $('.modal-footer').css("background", colorCategory(event.category));
    $('.modal-footer').css("color", "white");


    var modal = document.getElementById('myModal');
    modal.style.display = "block";


    var span = document.getElementsByClassName("close")[0];



    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


/**
 * This function define a Date based on day of week, 
 * the start and the end of lessons.
 * @param {Integer} numDay - number of day of week 
 * @param {Integer} h - hours
 * @param {Integer} m - minutes
 * 
 * @method createDate
 */
function createDate(numDay, h, m) {
    // create Date object from valid string inputs
    var datetime = new Date();

    datetime.setDate(datetime.getDate() - datetime.getDay() + numDay);

    datetime.setHours(h);
    datetime.setMinutes(m);
    datetime.setMilliseconds(00);
    return datetime;
}

/**
 * Function for the conversion between rulereactor outpot and fullcalendar input event
 * @param {Object} toPrint - Object to print i.e String/Integer/array etc.
 */

function dateConverter(d, hm) {
    var result = '2018-11-0' + (d) + 'T' + ("0" + hm[0]).slice(-2) + ':' + hm[1] + ':00';
    return result;
}

/**
 * Function for print somethings
 * @param {Object} toPrint - Object to print i.e String/Integer/array etc.
 */
function printForDebug(toPrint, color = "black", background = "yellow") {
    console.log("%c ==========================================", "color:" + color + "; background:" + background);
    console.log("%c" + toPrint, "color:" + color + "; background:" + background);
    console.log("%c ==========================================", "color:" + color + "; background:" + background)
}


/**
 * Function for color events based on category
 * 
 * REF: https://www.w3schools.com/colors/colors_picker.asp?
 */
function colorCategory(cy) {

    if (cy == "8028 Informatica Magistrale 1 anno") {
        return "#000000"; // BLACK //"coral";
    }
    else if (cy == "8028 Informatica Magistrale 2 anno") {
        return "#737373"; // GRAY //"orange";
    }
    else if (cy == "8009 Informatica Triennale 1 anno") {
        return "#800000"; 
    }
    else if (cy == "8009 Informatica Triennale 2 anno") {
        return "#cc3300"; 
    }
    else if (cy == "8009 Informatica Triennale 3 anno") {
        return "#ff9966" 
    }
    else if (cy == "8014 Informatica per il Management 1 anno") {
        return "#003300" 
    }
    else if (cy == "8014 Informatica per il Management 2 anno") {
        return "#339966" 
    }
    else if(cy=="8014 Informatica per il Management 3 anno"){
        return "#009999" 
    }

}

/**
 * Show the spinner and the background opacity
 * 
 * @method showSpinnerLoader
 */
function showSpinnerLoader(){
    $(".overlayLoader").css("display", "block");
    $("#loader").css("display", "block");
}

/**
 * Hide the spinner and the background opacity
 * 
 * @method hideSpinnerLoader
 */
function hideSpinnerLoader(){
    $("#loader").css("display", "none");
    $(".overlayLoader").css("display", "none");
}


