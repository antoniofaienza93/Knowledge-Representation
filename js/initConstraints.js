/*
 * ===========================================================================
 * File: InitConstraint.js 
 * Author: Antonio Faienza, Luca Angelucci, Alessio Ciarrocchi
 * Desc: This file is used by constraint.html and create the form for add a
 * new constraint
 * ===========================================================================
 */
$(document).ready(function () {

    // slideDownAndUp();
    resetFormValues();

    $('#findProfessor_chosen').css("width", "100%");
    $('#ChooseDay1_chosen').css("width", "100%");
    $('#ChooseDay2_chosen').css("width", "100%");
    
    selectProfessors();

    $('#divConstraint').hide();
    $('#DivSelectDay2').hide();

    $('#findProfessor').change(function() {
        $('#divConstraint').show();
        var prof = $('#findProfessor').val();
        if(prof!=''){
            selectPreference(prof)
        }
        else{
            resetFormValues();
            $('#divConstraint').hide();
            $('#DivSelectDay2').hide();
        }
    });

    $('#deleteConstraint').click(function() {
        $('#constraintForm').attr('action', 'http://127.0.0.1:5000/deletePreference');
    });

    $('.checkDisc').click(function() {
        $('.checkDisc').not(this).prop('checked', false);
    });
    $('.checkConse').click(function() {
        $('.checkConse').not(this).prop('checked', false);
    });
    $('.checkChalks').click(function() {
        $('.checkChalks').not(this).prop('checked', false);
    });
    $('.checkAMPM').click(function() {
        $('.checkAMPM').not(this).prop('checked', false);
    });

    $('#ConsecutiveDays input[type=checkbox]').change(function() {
        if ($(this).is(':checked')) {                       
            $('#RowNoLessonDays').hide();
            var ddl1 = $("#ChooseDay1");
            generateChooseDays(ddl1);

            $('#RowNoLessonAMPM').hide();
            $('.checkAMPM').not(this).prop('checked', false);
        }
        else{
            $('#RowNoLessonDays').show();
            $('#RowNoLessonAMPM').show();
        }
    });

    $('#ChooseDay1').change(function() {
        var day1 = $('#ChooseDay1').val();
        if(day1 == ''){
            $('#DivSelectDay2').hide();
            $('#RowConsecutiveDays').show();
            $('#RowNoLessonAMPM').show();
            
            var ddl2 = $("#ChooseDay2");
            ddl2.empty();
            generateChooseDays(ddl2);
            // ddl2.append("<option value='' selected>Nessuna Preferenza</option>");
            // $("#ChooseDay2  option[value='']");
            // ddl2.trigger("chosen:updated");
        }
        else{
            $('#RowConsecutiveDays').hide();
            $('.checkConse').not(this).prop('checked', false);

            $('#DivSelectDay2').show();
            var ddl2 = $("#ChooseDay2");
            generateChooseDays(ddl2);
            $("#ChooseDay2 option[value='" + day1 + "']").remove();
            $("#ChooseDay2  option[value='']");
            ddl2.trigger("chosen:updated");

            $('#RowNoLessonAMPM').hide();
            $('.checkAMPM').not(this).prop('checked', false);
        }
    });

    $('#NoLessonAMPM input[type=checkbox]').change(function() {
        if ($(this).is(':checked')) {            
            $('#RowNoLessonDays').hide();
            var ddl1 = $("#ChooseDay1");
            generateChooseDays(ddl1);

            $('#RowConsecutiveDays').hide();
            $('.checkConse').not(this).prop('checked', false);
        }
        else{
            $('#RowNoLessonDays').show();
            $('#RowConsecutiveDays').show();
        }
    });


});

/**
 * This function aims to slideUp and slideDown Panel
 * @method slideDownUp
 * REF: https://www.khanacademy.org/computer-programming/jquery-example-slideup-slidedown-and-slidetoggle/4722237555474432
 */
function slideDownAndUp(){
    $('#findProfessor_chosen').css("width", "100%");
    $('#ChooseDay1_chosen').css("width", "100%");
    $('#ChooseDay2_chosen').css("width", "100%");
}


/**
 * Genera la lista dei giorni della settimana
 */
function generateChooseDays(ddl){
    ddl.empty();
    ddl.append("<option value='' selected>Nessuna Preferenza</option>");
    ddl.append("<option value='Monday'>Lunedì</option>");
    ddl.append("<option value='Tuesday'>Martedì</option>");
    ddl.append("<option value='Wednesday'>Mercoledì</option>");
    ddl.append("<option value='Thursday'>Giovedì</option>");
    ddl.append("<option value='Friday'>Venerdì</option>"); 
    ddl.trigger("chosen:updated");
}

/**
 * Query for select all professors
 * @method selectProfessors
 */
function selectProfessors() {
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT ?name ?surname ?id
                    FROM <http://www.rdcproject.com/graph/professor>
                    WHERE
                    { ?x  a uni:Teacher.
                        ?x uni:firstName ?name.
                        ?x uni:lastName ?surname.
                        ?x uni:idProfessor ?id.
                        }
                    ORDER BY ?surname ?name`;

    var encodedquery = encodeURIComponent(myquery);

    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {

            // ChosenJS Select Dropdown List
            var ddl = $("#findProfessor");
            ddl.empty();
            ddl.append("<option value=''></option>");

            $.each(results, function (index, element) {
                var bindings = element.bindings;
                for (i in bindings) {
                    var id = bindings[i].id.value
                    var name = bindings[i].name.value
                    var surname = bindings[i].surname.value
                    ddl.append("<option value='" + id + "'>" + surname + " " + name + "</option>");
                }
                ddl.trigger("chosen:updated");
            });

        }

    });
}


/**
 * Query for select all preferences of a professor
 * @method selectPreference
 */
function selectPreference(prof) {
    var endpointURL = "http://localhost:3030/ds/query";

    var myquery = ` PREFIX uni: <http://www.rdfproject.com/>
                    PREFIX un: <http://www.w3.org/2007/ont/unit#>

                    SELECT ?sixHourSplit ?consecutiveDays ?noLessonDay1 ?noLessonDay2 ?noLessonAMPM ?writeMethodRoom
                    FROM <http://www.rdcproject.com/graph/preferences>
                    WHERE
                    { ?x  a uni:Preference.
                        ?x uni:sixHourSplit ?sixHourSplit.
                        ?x uni:consecutiveDays ?consecutiveDays.
                        ?x uni:noLessonDay1 ?noLessonDay1.
                        ?x uni:noLessonDay2 ?noLessonDay2.
                        ?x uni:noLessonAMPM ?noLessonAMPM.
                        ?x uni:writeMethodRoom ?writeMethodRoom.
                        ?x uni:isPreferenceOf ? uni:`+ prof +`;
                        }
                    ORDER BY ?isPreferenceOf`;

    var encodedquery = encodeURIComponent(myquery);

    console.log(myquery);

    $.ajax({
        dataType: "jsonp",
        url: endpointURL + "?query=" + encodedquery + "&format=" + "json",
        success: function (results) {

            resetFormValues();
            
            var ddl1 = $("#ChooseDay1");
            var ddl2 = $("#ChooseDay2");

            $.each(results, function (index, element) {
                var bindings = element.bindings;
                // REF: https://www.w3.org/TR/rdf-sparql-json-res/
                for (i in bindings) {
                    var sixHourSplit = bindings[0].sixHourSplit.value
                    var consecutiveDays = bindings[0].consecutiveDays.value
                    var noLessonDay1 = bindings[0].noLessonDay1.value
                    var noLessonDay2 = bindings[0].noLessonDay2.value
                    var noLessonAMPM = bindings[0].noLessonAMPM.value
                    var writeMethodRoom = bindings[0].writeMethodRoom.value

                    $('#constraintForm').attr('action', 'http://127.0.0.1:5000/updatePreference');

                    // set new values
                    $("#ChooseDay1 option[value='" + noLessonDay1 + "']").prop('selected', true).change();
                    ddl1.trigger("chosen:updated");
                    $("#ChooseDay2 option[value='" + noLessonDay2 + "']").prop('selected', true).change();
                    ddl2.trigger("chosen:updated");                    
                    $('#Discipline6H input[type=checkbox][value="'+sixHourSplit+'"]').prop('checked', true).change();
                    $('#ConsecutiveDays input[type=checkbox][value="'+consecutiveDays+'"]').prop('checked', true).change();                  
                    $('#NoLessonAMPM input[type=checkbox][value="'+noLessonAMPM+'"]').prop('checked', true).change();
                    $('#writeMethodRoom input[type=checkbox][value="'+writeMethodRoom+'"]').prop('checked', true).change();
                }
            });

        }

    });
}


function resetFormValues(){
    
    // reset values
    $('#constraintForm').attr('action', 'http://127.0.0.1:5000/addPreference');


    var ddl1 = $("#ChooseDay1");
    generateChooseDays(ddl1);

    var ddl2 = $("#ChooseDay2");
    ddl2.empty();
    // ddl2.append("<option value='' selected>Nessuna Preferenza</option>");
    // $("#ChooseDay2  option[value='']");
    // ddl2.trigger("chosen:updated");
    generateChooseDays(ddl2);

    $('.checkDisc').prop('checked', false).change();
    $('.checkConse').prop('checked', false).change();           
    $('.checkAMPM').prop('checked', false).change();
    $('.checkChalks').prop('checked', false).change();

}

