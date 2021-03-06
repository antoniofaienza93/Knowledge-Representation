/**
 * ===========================================================================
 * File: Discipline.js 
 * Author: Antonio Faienza, Luca Angelucci, Alessio Ciarrocchi
 * This file create a Discipline Class. It contains the main information of Discipline. i.e obligatory or not
 * and some information optional that can be added with specifi method as addProfessor
 * ===========================================================================
 */
function Discipline(id, abbreviation, name, semester, obligatory, curriculum, totalHours, weeksHours, cfu, year, numStudents) {
    this.id = id;
    this.abbreviation = abbreviation;
    this.name = name;
    this.semester = semester;
    this.obligatory = obligatory; // convert string to Boolan
    this.curriculum = curriculum;
    this.totalHours = totalHours;
    this.weeksHours = weeksHours;
    this.cfu = cfu;
    this.year = year;
    this.numStudents = numStudents;
    var professor = [];
    this.course = null;

    var preference = [];


    /**
     * Return a Name
     */
    this.getName = function () {
        return this.name;
    };

    /**
     * Return abbreviation of discipline 
     */
    this.getAbbreviation = function () {
        return this.abbreviation;
    };


    /**
     * Return the obligatory of Course
     */
    this.getObligatory = function () {
        return this.obligatory;
    }

    /**
     * Return the WeeksHours of Course
     */
    this.getWeeksHours = function () {
        return this.weeksHours;
    };


    /**
     * Return the TotalHours of Course
     */
    this.getTotalHours = function () {
        return this.totalHours;
    };



    /**
     * Return the obligatory of Course
     */
    this.getObligatory = function () {
        var isTrueSet;
        if (this.obligatory == 'true') {
            isTrueSet = true;
        } else if (this.obligatory == 'false') {
            isTrueSet = false;
        }
        return isTrueSet;
    };

    /**
     * Return the Year of Discipline
     */
    this.getYear = function () {
        return this.year;
    };

    /**
     * Return the Semester of Discipline
     */
    this.getSemester = function () {
        return this.semester;
    };

    /**
     * Set a new Professor insiede an array becaure for an discipline can
     * be taught by multiple professor
     */
    this.setProfessor = function (t) {
        professor.push(t);
    }

    /**
     * Return an Array of Professor of this discipline
     */
    this.getProfessor = function () {
        return professor;
    }

    /**
    * Function to set discipline's teacher
    */
    // this.setDisciplineProfessor=function() {
    //     var subjectProfessor = queryDisciplineProfessor(this.id);
    //     for (var i = 0; i < subjectProfessor; i++) {

    //     }

    // }

    this.getAllProfessor = function () {
        var allProfessor = '';
        for (var i = 0; i < professor.length; i++) {
            allProfessor += professor[i].getCompleteName() + " ";
        }
        return allProfessor;
    }

    /**
     * Return an Array of Professor of this discipline in JSON Format
     */
    this.getProfessorJSON = function () {
        return JSON.stringify({ professor }, null, " ");
    }

    /**
    * Return an Array of Curriculum of this discipline
    */
    this.getCurriculum = function () {
        return curriculum;
    }
    /**
     * Compare two array of curriculum and return response by Boolean
     */
    this.getExistCurriculum = function (otherDisciplineCurriculum) {

        if (this.curriculum != undefined && otherDisciplineCurriculum != undefined) {
            return this.curriculum.some(r => otherDisciplineCurriculum.includes(r));
        } else {
            // if is undefined it means that is facoltative and for this can be overlap 
            return false;
        }

    }
    /**
    * Return an Array of Curriculum of this discipline in JSON Format
    */
    this.getCurriculumJSON = function () {
        return JSON.stringify({ curriculum }, null, " ");
    }

    // this.getExistCurriculum = function (sigle) {
    //     var obj = this.curriculum.find(o => o.id === sigle);
    //     if (obj != undefined) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }


    /**
     * Set a new Course
     */
    this.setCourse = function (c) {
        this.course = c;
    }

    /**
     * Return a Course of Discipline
     */
    this.getCourse = function () {
        return this.course;
    }

    /**
     * Return the Num of Students
     */
    this.getNumStudent = function () {
        return this.numStudents;
    }

    /**
     * **********************************************************************************************
     * ***************************************** PREFERENCE *****************************************
     * **********************************************************************************************
     */

    this.setPreferences = function (p) {
        // Resize preferences 
        preference.length = 0;

        // Set preferences
        if(p.consecutiveday != "") this.consecutiveDay(p.consecutiveday);       
        if(p.setperiodofday != "") this.setPeriodOfDay(p.setperiodofday);
        if(p.blackboard != "") this.blackboard(p.blackboard);
        if(p.avoidlessonday1 != "") this.avoidLessonDay1(p.avoidlessonday1);
        if(p.avoidlessonday2 != "") this.avoidLessonDay2(p.avoidlessonday2);        
        if(p.splitdurationlessons6h != "") {
            this.splitDurationLessons6h(parseInt(p.splitdurationlessons6h))
        }else{
            this.splitDurationLessons6h(3);
        }
        
        


    }
    /**
     * *********************************** FOR ALL PREFERENCE ***********************************
     * Check from Preference exist a particular preference named by param i.e avoidLessonDay
     * REF: https://stackoverflow.com/questions/1098040/checking-if-a-key-exists-in-a-javascript-object
     * ******************************************************************************************
     */
    this.checkExistPreference = function (key) {
        var exist = false;
        for (var i = 0; i < preference.length; i++) {
            if (key in preference[i]) {
                exist = true;
            }
        }
        return exist;

    }

   

    /**
     * Return the array of Preference
     */
    this.getPreference = function () {        
            return preference;        
    }

    /**
     * ***************************
     * ***** CONSECUTIVE DAY *****
     * ***************************
     */

    /**
     * Set the preference of consecutive day as true
     */
    this.consecutiveDay = function (d) {
        if (this.checkExistPreference("consecutiveday")) {
            for (var i = 0; i < preference.length; i++) {
                delete preference[i].consecutiveday;
            }
            var filtered = preference.filter(value => Object.keys(value).length != 0);
            preference = filtered;
        }

        var consday = { "consecutiveday": d }
        preference.push(consday);
    }

    /**
     * Return the choice between two:
     * - startweek
     * - endweek
     */
    this.getChoiceConsecutiveDay = function (p) {
        var obj = preference.find(o => o.consecutiveday === p);
        if (obj != undefined) {
            return obj.consecutiveday;
        }
        else {
            return undefined;
        }
    }


    /**
     * ****************************
     * ***** AVOID LESSON DAY *****
     * ****************************
     */

    /**
     * Set the preference that for this discipline an professor
     * want to avoid a specific day1
     */
    this.avoidLessonDay1 = function (d) {
        if (this.checkExistPreference("avoidlessonday1")) {
            for (var i = 0; i < preference.length; i++) {
                delete preference[i].avoidlessonday1;
            }
            var filtered = preference.filter(value => Object.keys(value).length != 0);
            preference = filtered;
        }
        var avDay = { "avoidlessonday1": d };
        preference.push(avDay);
    }

    /**
     * Set the preference that for this discipline an professor
     * want to avoid a specific day2
     */
    this.avoidLessonDay2 = function (d) {
        if (this.checkExistPreference("avoidlessonday2")) {
            for (var i = 0; i < preference.length; i++) {
                delete preference[i].avoidlessonday2;
            }
            var filtered = preference.filter(value => Object.keys(value).length != 0);
            preference = filtered;
        }
        var avDay = { "avoidlessonday2": d };
        preference.push(avDay);
    }




    /**
     * Check from the preference if exist a lesson day that is assigned 
     * to a day to avoid
     */
    this.checkIncompatibilyDay1 = function (v) {

        var inDay = false;
        if (preference.some(e => e.avoidlessonday1 == v)) {
            inDay = true;
        }

        return inDay;
    }

    /**
     * Check from the preference if exist a lesson day that is assigned 
     * to a day to avoid
     */
    this.checkIncompatibilyDay2 = function (v) {

        var inDay = false;
        if (preference.some(e => e.avoidlessonday2 == v)) {
            inDay = true;
        }

        return inDay;
    }

    /**
    * *****************************
    * ***** SET PERIOD OF DAY *****
    * *****************************
    */

    /**
     * Set the period of day into preference
     */
    this.setPeriodOfDay = function (d) {
        if (this.checkExistPreference("setperiodofday")) {
            for (var i = 0; i < preference.length; i++) {
                delete preference[i].setperiodofday;
            }
            var filtered = preference.filter(value => Object.keys(value).length != 0);
            preference = filtered;
        }
        var pDay = { "setperiodofday": d };
        preference.push(pDay);
    }

    /**
     * Return based on key the value that i find
     */
    this.getPeriodOfDay = function (p) {
        var obj = preference.find(o => o.setperiodofday === p);
        if (obj != undefined) {
            return obj.setperiodofday;
        }
        else {
            return undefined;
        }
    }


    /**
    * *********************************
    * ***** SPLIT DURATION LESSON *****
    * *********************************
    */

    /**
     * Set the preference of split of lessons of 6 H
     * 3 Choice: 
     *  - 2 --> 2 2 2
     *  - 4 --> 4 2
     *  - 3 --> 3 3
     */
    this.splitDurationLessons6h = function (d) {
        if (this.checkExistPreference("splitdurationlessons6h")) {
            for (var i = 0; i < preference.length; i++) {
                delete preference[i].splitdurationlessons6h;
            }

            var filtered = preference.filter(value => Object.keys(value).length != 0);
            preference = filtered;
        }
        var splitD = { "splitdurationlessons6h": d };
        preference.push(splitD);
    }

    /**
     * Return the preference of split duration lesson
     */
    this.getSplitDuration = function (p) {
        var obj = preference.find(o => o.splitdurationlessons6h === p);
        if (obj != undefined) {
            return obj.splitdurationlessons6h;
        }
        else {
            return undefined;
        }
    }

    /**
     * *****************************
     * ******** BLACKBOARD ********
     * *****************************
     */

    /**
     * Set the preference that for this discipline 
     * that classroom has the blackboard preference
     */
    this.blackboard = function (d) {
        if (this.checkExistPreference("blackboard")) {
            for (var i = 0; i < preference.length; i++) {
                delete preference[i].blackboard;
            }
            var filtered = preference.filter(value => Object.keys(value).length != 0);
            preference = filtered;
        }
        var blackboardBool = { "blackboard": d };
        preference.push(blackboardBool);
    }


    /**
     * Return based on key the value that i find
     */
    this.getBlackboard = function () {
        var obj = preference.find(o => o.blackboard);
        if (obj != undefined) {
            return obj.blackboard;
        }
        else {
            return undefined;
        }
    }



    /**
     * **********************************************************************************************
     * ****************************************** TOSTRING ******************************************
     * **********************************************************************************************
     */

    /**
     * Return the main information of discipline
     */
    this.toString = function () {
        var p = JSON.stringify({ preference }, null, " ");
        return this.name + " " + professor + " " + this.course;
    }

    /**
     * Return the main information of discipline in JSON format
     */
    this.toStringJSON = function () {
        var t = JSON.stringify({ professor }, null, " ");
        var cur = JSON.stringify({ curriculum }, null, " ");
        var p = JSON.stringify({ preference }, null, " ");

        return this.name + " " + t + " " + this.course + " " + cur + " " + p;


    }





}