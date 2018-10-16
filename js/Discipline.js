/**
 * ===========================================================================
 * File: Discipline.js 
 * Author: Antonio Faienza, Luca Angelucci, Alessio Ciarrocchi
 * This file create a Discipline Class. It contains the main information of Discipline. i.e obligatory or not
 * and some information optional that can be added with specifi method as addProfessor
 * ===========================================================================
 */
function Discipline(id, abbreviation, name, semester, obligatory, totalHours, weeksHours, cfu, year, numStudents) {
    this.id = id;
    this.abbreviation = abbreviation;
    this.name = name;
    this.semester = semester;
    this.obligatory = obligatory;
    this.totalHours = totalHours;
    this.weeksHours = weeksHours;
    this.cfu = cfu;
    this.year = year;
    this.numStudents = numStudents;
    var professor = [];
    this.course = null;
    var curriculum = [];
    var preference = [];


    /**
     * Return a Name
     */
    this.getName = function () {
        return this.name;
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
     * Return the obligatory of Course
     */
    this.getObligatory = function () {
        return this.obligatory;
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
     * Set a new Curriculum insiede an array becaure for an discipline can
     * be belong by multiple Curriculum
     */
    this.addCurriculum = function (cur) {
        curriculum.push(cur);
    }

    /**
    * Return an Array of Curriculum of this discipline
    */
    this.getCurriculum = function () {
        return curriculum;
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
    this.addCourse = function (c) {
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
        if (preference.length == 0) {
            return "ATTENZIONE: Nessuna preferenza impostata per la disciplina" + this.name;
        } else {
            return preference;
        }
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
                preference.splice(i.consecutiveday, 1);
            }
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
     * want to avoid a specific day
     */
    this.avoidLessonDay = function (d) {
        var avDay = { "avoidLessonDay": d };
        preference.push(avDay);
    }

    /**
     * Delete from preference the avoid lesson day
     * DA USARAE PER ALESSIO
     */
    this.deleteAvoidLessonDay = function () {
        for (var i = 0; i < preference.length; i++) {
            preference.splice(i.avoidLessonDay, 1);
        }

    }

    /**
     * Check from the preference if exist a lesson day that is assigned 
     * to a day to avoid
     */
    this.checkIncompatibilyDay = function (v) {
        var inDay = false;
        if (preference.some(e => e.avoidLessonDay === v)) {
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
                preference.splice(i.setperiodofday, 1);
            }
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
                preference.splice(i.splitdurationlessons6h, 1);
            }            
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
     * ******** CHALK CLASS ********
     * *****************************
     */

    /**
     * Set the preference that for this discipline 
     * that classroom has the chalk
     */
    this.chalkClass = function (d) {
        if (this.checkExistPreference("chalkclass")) {
            for (var i = 0; i < preference.length; i++) {
                preference.splice(i.chalkclass, 1);
            }
        }
        var chalkBool = { "chalkclass": d };
        preference.push(chalkBool);
    }


    /**
     * Return based on key the value that i find
     */
    this.getChalkClass = function (v) {
        if (preference.some(e => e.chalkclass === v)) {
            return true;
        } else {
            return false;
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
        return this.name + " " + t + " " + course + " " + cur + " " + p;
    }





}