/*
 * ===========================================================================
 * File: Const.js 
 * Author: Antonio Faienza
 * Desc: This file contains global variable
 * ===========================================================================
 */

// start lessons
var START_LESSONS = 9;

var DURATION_LESSON = 2;

// end lessons
var END_LESSONS = 18;

// Global calendar
var calendar;

// Momentjs calendar
moment.locale('en');
var now = moment();

// Events of calendar
var events = [];

// var classrooms = ['Aula Ercolani 1', 'Aula Ercolani 2', 'Aula Ercolani 3', 'Lab Ercolani', 'Ranzani', 'Vitali'];
// var classrooms = ['Aula Ercolani 1', 'Aula Ercolani 2'];
var classrooms = [];
classrooms.push(new Classroom(12347,"E1","Ercolani",40,true,true));
classrooms.push(new Classroom(12348,"E2","Ercolani",35,true,true));
classrooms.push(new Classroom(12349,"E3","Ercolani",20,true,true));
classrooms.push(new Classroom(51200,"Enriquez","Matematica",30,false,false));
classrooms.push(new Classroom(51201,"Pincherle","Matematica",30,false,false));
classrooms.push(new Classroom(51202,"Cremona","Matematica",30,false,false));
classrooms.push(new Classroom(51203,"Tonelli","Matematica",30,true,false));
classrooms.push(new Classroom(51204,"Sem8","Matematica",30,true,false));
classrooms.push(new Classroom(44981,"C1 Ranzani","Ranzani",30,false,false));
classrooms.push(new Classroom(44982,"Lab Ranzani","Ranzani",30,true,true));



var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];


// var nomiMaterie = ['RDC', 'SM', 'IOT', 'MSC', 'MAT', 'COM', 'UUX'];
// var nomiMaterie = ['RDC', 'SM', 'IOT', 'MAT'];
var nomiMaterie = ['RDC', 'SM', 'IOT'];

// var nomiMaterieInfoMan = ['DI', 'EA', 'AM', 'PI'];
var nomiMaterieInfoMan = ['DI', 'EA', 'AM'];

var nomiMaterieInfoTriennale = ['P', 'O', 'CN'];



// id, name
var infoman = new Course(8014, "Informatica per il Management");
var info = new Course(8009, "Informatica Triennale");
var infolm = new Course(8028, "Informatica Magistrale");

// Discipline(id, abbreviation ,name, semester, obligatory, totalHours, weeksHours, cfu, year) {
var cbd = new Discipline("28796", "CBD", "COMPLEMENTI DI BASI DI DATI", "1", true, 60, 5, 6, 1);
var uux = new Discipline("81670", "UUX", "USABILITA E USER EXPERIENCE", "1", true, 60, 6, 6, 1);
var gmb = new Discipline("81960", "TG", "GIOCHI E MODELLI BOOLEANI", "1", true, 60, 6, 6, 1);
var ap = new Discipline("81668", "AA", "ALGORITMI PARALLELI", "1", true, 60, 6, 6, 1);
var isos = new Discipline("77803", "ISOS", "INGEGNERIA DEL SOFTWARE ORIENTATA AI SERVIZI", "1", false, 50, 5, 6, 1);
var fsc = new Discipline("23762", "FSC", "FISICA DEI SISTEMI COMPLESSI", "1", false, 50, 5, 6, 1);
var sds = new Discipline("37760", "SDS", "SIMULAZIONE DI SISTEMI", "1", false, 50, 5, 6, 1);

var currA = new Curriculum("A", "Tecniche del Software");
var currB = new Curriculum("B", "Informatica per il Management");
var currC = new Curriculum("C", "Sistemi e Reti");
cbd.addCurriculum(currA);
cbd.addCurriculum(currB);
cbd.addCurriculum(currC);
uux.addCurriculum(currA);
uux.addCurriculum(currB);
uux.addCurriculum(currC);
gmb.addCurriculum(currB);
ap.addCurriculum(currA);
ap.addCurriculum(currC);

// firstName,surName,id_professor,role
var dm = new Professor("Danilo", "Montesi", 211832, "ordinario");
var fv = new Professor("Fabio", "Vitali", 150348, "ordinario");
var gr = new Professor("Giovanni", "Rossi", 000002, "contratto");
var ab = new Professor("Alan Albert", "Bertossi", 295601, "ordinario");
var dr = new Professor("Davide", "Rossi", 000003, "contratto");
var sr = new Professor("Sandro", "Rambaldi", 841964, "associato");
var ld = new Professor("Lorenzo", "Donatiello", 000005, "ordinario");





///////////////////////////////////////////////////////////
// ADD TEACHER
cbd.addTeacher(dm);
uux.addTeacher(fv);
gmb.addTeacher(gr);
ap.addTeacher(ab);
isos.addTeacher(dr);
fsc.addTeacher(sr);
sds.addTeacher(ld);

// ADD COURSE
cbd.addCourse(infolm);
uux.addCourse(infolm);
gmb.addCourse(infolm);
ap.addCourse(infolm);
isos.addCourse(infolm);
fsc.addCourse(infolm);
sds.addCourse(infolm);


// INFOMAN
var di = new Discipline("28796", "DI", "Diritto di Internet", "1", true, 60, 5, 6, 1);
var ea = new Discipline("28797", "EA", "Economia Aziendale", "1", true, 60, 5, 6, 1);
var am = new Discipline("28798", "AM", "Analisis Matematica", "1", true, 60, 5, 6, 1);
di.addCourse(infoman);
ea.addCourse(infoman);
am.addCourse(infoman);

// INFORMATICA TRIENNALE
var p = new Discipline("28799", "P", "Programmazione", "1", true, 60, 5, 6, 1);
var o = new Discipline("28800", "O", "Ottimizzazione", "1", true, 60, 5, 6, 1);
var cn = new Discipline("28801", "CN", "Calcolo Numerico", "1", true, 60, 5, 6, 1);
p.addCourse(info);
o.addCourse(info);
cn.addCourse(info);


var subject = [];
// TRIENNALE
subject.push(di);
subject.push(ea);
subject.push(am);
subject.push(p);
subject.push(o);
subject.push(cn);

// MAGISTRALE
subject.push(cbd);
subject.push(uux);
subject.push(gmb)
subject.push(ap);
subject.push(isos);
subject.push(fsc);
subject.push(sds);


