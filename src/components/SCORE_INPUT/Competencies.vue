<template>
  <div>
    <fieldset class="box" style="margin-top: 15px">
      <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Competencies</b></legend>
        <label><b>Competencies Score:</b>
          <input class="input" v-model="Competencies" disabled>
        </label>  
        <div>
          <fieldset v-if="CompetenciesArrayIDs.includes(0)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Approachability</b></legend>
              <label><b>EE</b>
              <!-- v-model="CompetencyScores[0].Approachability" v-bind:value="3" -->
              <input v-model="CompetencyScores[0].Approachability" v-bind:value="3" v-bind:title="0" v-on:change="updateCompetencyScore" type="radio" name="Approachability">
              </label>
              <label><b>PW</b>
              <!-- v-model="CompetencyScores[0].Approachability" v-bind:value="2" style="margin-right: 10px" style="margin-right: 10px" -->
              <input v-model="CompetencyScores[0].Approachability" v-bind:value="2" style="margin-right: 10px" v-bind:title="0" v-on:change="updateCompetencyScore" type="radio" name="Approachability">
              </label>
              <label><b>NI</b>
              <!-- v-model="CompetencyScores[0].Approachability" v-bind:value="0" -->
              <input v-model="CompetencyScores[0].Approachability" v-bind:value="0" v-bind:title="0" v-on:change="updateCompetencyScore" type="radio" name="Approachability">
              </label>
              <!-- <button v-on:click="ApproachabilityComment">Comment</button> -->
          </fieldset>
          <fieldset v-if="CompetenciesArrayIDs.includes(1)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Action Oriented</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[1].ActionOriented" v-bind:value="3" style="margin-right: 10px" v-bind:title="1" type="radio" v-on:change="updateCompetencyScore" name="ActionOriented">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[1].ActionOriented" v-bind:value="2" style="margin-right: 10px" v-bind:title="1" type="radio" v-on:change="updateCompetencyScore" name="ActionOriented">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[1].ActionOriented" v-bind:value="0" v-bind:title="1" type="radio" v-on:change="updateCompetencyScore" name="ActionOriented">
              </label>
              <!-- <button v-on:click="ActionOrientedComment">Comment</button> -->
          </fieldset>
          <fieldset v-if="CompetenciesArrayIDs.includes(2)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Building Effective Teams</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[2].BuildingEffectiveTeams" v-bind:value="3" style="margin-right: 10px" v-bind:title="2" type="radio" v-on:change="updateCompetencyScore" name="BuildingEffectiveTeams">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[2].BuildingEffectiveTeams" v-bind:value="2" style="margin-right: 10px" v-bind:title="2" type="radio" v-on:change="updateCompetencyScore"  name="BuildingEffectiveTeams">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[2].BuildingEffectiveTeams" v-bind:value="0" v-bind:title="2" type="radio" v-on:change="updateCompetencyScore"  name="BuildingEffectiveTeams">
              </label>
              <!-- <button v-on:click="BuildingEffectiveTeamsComment">Comment</button> -->
          </fieldset>
          <fieldset v-if="CompetenciesArrayIDs.includes(3)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Business Acumen</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[3].BusinessAcumen" v-bind:value="3" style="margin-right: 10px" v-bind:title="3" type="radio" v-on:change="updateCompetencyScore"  name="BusinessAcumen">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[3].BusinessAcumen" v-bind:value="2" style="margin-right: 10px" v-bind:title="3" type="radio" v-on:change="updateCompetencyScore"  name="BusinessAcumen">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[3].BusinessAcumen" v-bind:value="0" v-bind:title="3" type="radio" v-on:change="updateCompetencyScore"  name="BusinessAcumen">
              </label>
              <!-- <button v-on:click="BusinessAcumenComment">Comment</button> -->
          </fieldset>
          <fieldset v-if="CompetenciesArrayIDs.includes(4)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Composure</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[4].Composure" v-bind:value="3" style="margin-right: 10px" v-bind:title="4" type="radio" v-on:change="updateCompetencyScore" name="Composure">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[4].Composure" v-bind:value="2" style="margin-right: 10px" v-bind:title="4" type="radio" v-on:change="updateCompetencyScore" name="Composure">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[4].Composure" v-bind:value="0" v-bind:title="4" type="radio" v-on:change="updateCompetencyScore" name="Composure">
              </label>
              <!-- <button v-on:click="ComposureComment">Comment</button> -->
          </fieldset>
          <fieldset v-if="CompetenciesArrayIDs.includes(5)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Conflict Management</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[5].ConflictManagement" v-bind:value="3" style="margin-right: 10px" v-bind:title="5" type="radio" v-on:change="updateCompetencyScore" name="ConflictManagement">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[5].ConflictManagement" v-bind:value="2" style="margin-right: 10px" v-bind:title="5" type="radio" v-on:change="updateCompetencyScore" name="ConflictManagement">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[5].ConflictManagement" v-bind:value="0" v-bind:title="5" type="radio" v-on:change="updateCompetencyScore" name="ConflictManagement">
              </label>
              <!-- <button v-on:click="ConflictManagementComment">Comment</button> -->
          </fieldset>
          <fieldset v-if="CompetenciesArrayIDs.includes(6)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Customer Focus</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[6].CustomerFocus" v-bind:value="3" style="margin-right: 10px" v-bind:title="6" type="radio" v-on:change="updateCompetencyScore" name="CustomerFocus">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[6].CustomerFocus" v-bind:value="2" style="margin-right: 10px" v-bind:title="6" type="radio" v-on:change="updateCompetencyScore" name="CustomerFocus">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[6].CustomerFocus" v-bind:value="0" v-bind:title="6" type="radio" v-on:change="updateCompetencyScore" name="CustomerFocus">
              </label>
              <!-- <button v-on:click="CustomerFocusComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(7)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Dealing with Ambiguity</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[7].DealingWithAmbiguity" v-bind:value="3" style="margin-right: 10px" v-bind:title="7" type="radio" v-on:change="updateCompetencyScore" name="DealingWithAmbiguity">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[7].DealingWithAmbiguity" v-bind:value="2" style="margin-right: 10px" v-bind:title="7" type="radio" v-on:change="updateCompetencyScore" name="DealingWithAmbiguity">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[7].DealingWithAmbiguity" v-bind:value="0" v-bind:title="7" type="radio" v-on:change="updateCompetencyScore" name="DealingWithAmbiguity">
              </label>
              <!-- <button v-on:click="DealingWithAmbiguityComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(8)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Dealing with Paradox</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[8].DealingWithParadox" v-bind:value="3" style="margin-right: 10px" v-bind:title="8" type="radio" v-on:change="updateCompetencyScore" name="DealingWithParadox">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[8].DealingWithParadox" v-bind:value="2" style="margin-right: 10px" v-bind:title="8" type="radio" v-on:change="updateCompetencyScore" name="DealingWithParadox">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[8].DealingWithParadox" v-bind:value="0" v-bind:title="8" type="radio" v-on:change="updateCompetencyScore" name="DealingWithParadox">
              </label>
              <!-- <button v-on:click="DealingWithParadoxComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(9)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Delegation</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[9].Delegation" v-bind:value="3" style="margin-right: 10px" v-bind:title="9" type="radio" v-on:change="updateCompetencyScore" name="Delegation">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[9].Delegation" v-bind:value="2" style="margin-right: 10px" v-bind:title="9" type="radio" v-on:change="updateCompetencyScore" name="Delegation">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[9].Delegation" v-bind:value="0" v-bind:title="9" type="radio" v-on:change="updateCompetencyScore" name="Delegation">
              </label>
              <!-- <button v-on:click="DelegationComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(10)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Developing Direct Reports and Others</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[10].DevelopingDirectReports" v-bind:value="3" style="margin-right: 10px" v-bind:title="10" type="radio" v-on:change="updateCompetencyScore" name="DevelopingDirectReports">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[10].DevelopingDirectReports" v-bind:value="2" style="margin-right: 10px" v-bind:title="10" type="radio" v-on:change="updateCompetencyScore" name="DevelopingDirectReports">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[10].DevelopingDirectReports" v-bind:value="0" v-bind:title="10" type="radio" v-on:change="updateCompetencyScore" name="DevelopingDirectReports">
              </label>
              <!-- <button v-on:click="DevelopingDirectReportsComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(11)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Directing Others</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[11].DirectingOthers" v-bind:value="3" style="margin-right: 10px" v-bind:title="11" type="radio" v-on:change="updateCompetencyScore" name="DirectingOthers">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[11].DirectingOthers" v-bind:value="2" style="margin-right: 10px"  v-bind:title="11" type="radio" v-on:change="updateCompetencyScore" name="DirectingOthers">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[11].DirectingOthers" v-bind:value="0"  v-bind:title="11" type="radio" v-on:change="updateCompetencyScore" name="DirectingOthers">
              </label>
              <!-- <button v-on:click="DirectingOthersComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(12)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Drive for Results</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[12].DriveForResults" v-bind:value="3" style="margin-right: 10px" v-bind:title="12" type="radio" v-on:change="updateCompetencyScore" name="DriveForResults">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[12].DriveForResults" v-bind:value="2" style="margin-right: 10px" v-bind:title="12" type="radio" v-on:change="updateCompetencyScore" name="DriveForResults">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[12].DriveForResults" v-bind:value="0" v-bind:title="12" type="radio" v-on:change="updateCompetencyScore" name="DriveForResults">
              </label>
              <!-- <button v-on:click="DriveForResultsComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(13)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Functional/Technical Skills</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[13].FunctionalTechnicalSkills" v-bind:value="3" style="margin-right: 10px" v-bind:title="13" type="radio" v-on:change="updateCompetencyScore" name="FunctionalTechnicalSkills">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[13].FunctionalTechnicalSkills" v-bind:value="2" style="margin-right: 10px" v-bind:title="13" type="radio" v-on:change="updateCompetencyScore" name="FunctionalTechnicalSkills">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[13].FunctionalTechnicalSkills" v-bind:value="0" v-bind:title="13" type="radio" v-on:change="updateCompetencyScore" name="FunctionalTechnicalSkills">
              </label>
              <!-- <button v-on:click="FunctionalTechnicalSkillsComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(14)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Informing</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[14].Informing" v-bind:value="3" style="margin-right: 10px" v-bind:title="14" type="radio" v-on:change="updateCompetencyScore" name="Informing">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[14].Informing" v-bind:value="2" style="margin-right: 10px" v-bind:title="14" type="radio" v-on:change="updateCompetencyScore" name="Informing">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[14].Informing" v-bind:value="0" v-bind:title="14" type="radio" v-on:change="updateCompetencyScore" name="Informing">
              </label>
              <!-- <button v-on:click="InformingComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(15)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Interpersonal Savvy</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[15].InterpersonalSavvy" v-bind:value="3" style="margin-right: 10px" v-bind:title="15" type="radio" v-on:change="updateCompetencyScore" name="InterpersonalSavvy">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[15].InterpersonalSavvy" v-bind:value="2" style="margin-right: 10px" v-bind:title="15" type="radio" v-on:change="updateCompetencyScore" name="InterpersonalSavvy">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[15].InterpersonalSavvy" v-bind:value="0" v-bind:title="15" type="radio" v-on:change="updateCompetencyScore" name="InterpersonalSavvy">
              </label>
              <!-- <button v-on:click="InterpersonalSavvyComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(16)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Learning on the Fly</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[16].LearningOnTheFly" v-bind:value="3" style="margin-right: 10px" v-bind:title="16" type="radio" v-on:change="updateCompetencyScore" name="LearningOnTheFly">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[16].LearningOnTheFly" v-bind:value="2" style="margin-right: 10px" v-bind:title="16" type="radio" v-on:change="updateCompetencyScore" name="LearningOnTheFly">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[16].LearningOnTheFly" v-bind:value="0" v-bind:title="16" type="radio" v-on:change="updateCompetencyScore" name="LearningOnTheFly">
              </label>
              <!-- <button v-on:click="LearningOnTheFlyComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(17)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Listening</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[17].Listening" v-bind:value="3" style="margin-right: 10px" v-bind:title="17" type="radio" v-on:change="updateCompetencyScore" name="Listening">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[17].Listening" v-bind:value="2" style="margin-right: 10px" v-bind:title="17"  type="radio" v-on:change="updateCompetencyScore" name="Listening">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[17].Listening" v-bind:value="0" v-bind:title="17"  type="radio" v-on:change="updateCompetencyScore" name="Listening">
              </label>
              <!-- <button v-on:click="ListeningComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(18)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Managing Vision and Purpose</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[18].ManagingVisionAndPurpose" v-bind:value="3" style="margin-right: 10px" v-bind:title="18"  type="radio" v-on:change="updateCompetencyScore" name="ManagingVisionAndPurpose">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[18].ManagingVisionAndPurpose" v-bind:value="2" style="margin-right: 10px" v-bind:title="18"  type="radio" v-on:change="updateCompetencyScore" name="ManagingVisionAndPurpose">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[18].ManagingVisionAndPurpose" v-bind:value="0" v-bind:title="18"  type="radio" v-on:change="updateCompetencyScore" name="ManagingVisionAndPurpose">
              </label>
              <!-- <button v-on:click="ManagingVisionAndPurposeComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(19)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Motivating Others</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[19].MotivatingOthers" v-bind:value="3" style="margin-right: 10px" v-bind:title="19"  type="radio" v-on:change="updateCompetencyScore" name="MotivatingOthers">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[19].MotivatingOthers" v-bind:value="2" style="margin-right: 10px" v-bind:title="19" type="radio" v-on:change="updateCompetencyScore" name="MotivatingOthers">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[19].MotivatingOthers" v-bind:value="0" v-bind:title="19" type="radio" v-on:change="updateCompetencyScore" name="MotivatingOthers">
              </label>
              <!-- <button v-on:click="MotivatingOthersComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(20)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Organization</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[20].Organization" v-bind:value="3" style="margin-right: 10px" v-bind:title="20" type="radio" v-on:change="updateCompetencyScore" name="Organization">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[20].Organization" v-bind:value="2" style="margin-right: 10px" v-bind:title="20" type="radio" v-on:change="updateCompetencyScore" name="Organization">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[20].Organization" v-bind:value="0" v-bind:title="20" type="radio" v-on:change="updateCompetencyScore" name="Organization">
              </label>
              <!-- <button v-on:click="OrganizationComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(21)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Patience</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[21].Patience" v-bind:value="3" style="margin-right: 10px" type="radio" v-bind:title="21" v-on:change="updateCompetencyScore" name="Patience">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[21].Patience" v-bind:value="2" style="margin-right: 10px" type="radio" v-bind:title="21" v-on:change="updateCompetencyScore" name="Patience">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[21].Patience" v-bind:value="0" type="radio" v-bind:title="21" v-on:change="updateCompetencyScore" name="Patience">
              </label>
              <!-- <button v-on:click="PatienceComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(22)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Peer Relationships</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[22].PeerRelationships" v-bind:value="3" style="margin-right: 10px" v-bind:title="22" type="radio" v-on:change="updateCompetencyScore" name="PeerRelationships">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[22].PeerRelationships" v-bind:value="2" style="margin-right: 10px" v-bind:title="22" type="radio" v-on:change="updateCompetencyScore" name="PeerRelationships">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[22].PeerRelationships" v-bind:value="0" v-bind:title="22" type="radio" v-on:change="updateCompetencyScore" name="PeerRelationships">
              </label>
              <!-- <button v-on:click="PeerRelationshipsComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(23)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Perserverance</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[23].Perserverance" v-bind:value="3" style="margin-right: 10px" v-bind:title="23" type="radio" v-on:change="updateCompetencyScore" name="Perserverance">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[23].Perserverance" v-bind:value="2" style="margin-right: 10px" v-bind:title="23" type="radio" v-on:change="updateCompetencyScore" name="Perserverance">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[23].Perserverance" v-bind:value="0" v-bind:title="23" type="radio" v-on:change="updateCompetencyScore" name="Perserverance">
              </label>
              <!-- <button v-on:click="PerserveranceComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(24)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Perspective</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[24].Perspective" v-bind:value="3" style="margin-right: 10px" v-bind:title="24" type="radio" v-on:change="updateCompetencyScore" name="Perspective">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[24].Perspective" v-bind:value="2" style="margin-right: 10px" v-bind:title="24" type="radio" v-on:change="updateCompetencyScore" name="Perspective">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[24].Perspective" v-bind:value="0" v-bind:title="24" type="radio" v-on:change="updateCompetencyScore" name="Perspective">
              </label>
              <!-- <button v-on:click="PerspectiveComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(25)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Planning</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[25].Planning" v-bind:value="3" style="margin-right: 10px" v-bind:title="25" type="radio" v-on:change="updateCompetencyScore" name="Planning">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[25].Planning" v-bind:value="2" style="margin-right: 10px" v-bind:title="25" type="radio" v-on:change="updateCompetencyScore" name="Planning">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[25].Planning" v-bind:value="0" v-bind:title="25" type="radio" v-on:change="updateCompetencyScore" name="Planning">
              </label>
              <!-- <button v-on:click="PlanningComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(26)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Presentation Skills</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[26].PresentationSkills" v-bind:value="3" style="margin-right: 10px" v-bind:title="26" type="radio" v-on:change="updateCompetencyScore" name="PresentationSkills">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[26].PresentationSkills" v-bind:value="2" style="margin-right: 10px" v-bind:title="26" type="radio" v-on:change="updateCompetencyScore" name="PresentationSkills">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[26].PresentationSkills" v-bind:value="0" v-bind:title="26" type="radio" v-on:change="updateCompetencyScore" name="PresentationSkills">
              </label>
              <!-- <button v-on:click="PresentationSkillsComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(27)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Priority Setting</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[27].PrioritySetting" v-bind:value="3" style="margin-right: 10px" v-bind:title="27" type="radio" v-on:change="updateCompetencyScore" name="PrioritySetting">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[27].PrioritySetting" v-bind:value="2" style="margin-right: 10px" v-bind:title="27" type="radio" v-on:change="updateCompetencyScore" name="PrioritySetting">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[27].PrioritySetting" v-bind:value="0" v-bind:title="27" type="radio" v-on:change="updateCompetencyScore" name="PrioritySetting">
              </label>
              <!-- <button v-on:click="PrioritySettingComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(28)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Problem Solving</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[28].ProblemSolving" v-bind:value="3" style="margin-right: 10px" v-bind:title="28" type="radio" v-on:change="updateCompetencyScore" name="ProblemSolving">
              </label>
              <label><b>PW</b>
              <input v-model="CCompetencyScores[28].ProblemSolving" v-bind:value="2" style="margin-right: 10px" v-bind:title="28" type="radio" v-on:change="updateCompetencyScore" name="ProblemSolving">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[28].ProblemSolving" v-bind:value="0" v-bind:title="28" type="radio" v-on:change="updateCompetencyScore" name="ProblemSolving">
              </label>
              <!-- <button v-on:click="ProblemSolvingComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(29)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Process Management</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[29].ProcessManagement" v-bind:value="3" style="margin-right: 10px" v-bind:title="29" type="radio" v-on:change="updateCompetencyScore" name="ProcessManagement">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[29].ProcessManagement" v-bind:value="2" style="margin-right: 10px" v-bind:title="29" type="radio" v-on:change="updateCompetencyScore" name="ProcessManagement">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[29].ProcessManagement" v-bind:value="0" v-bind:title="29" type="radio" v-on:change="updateCompetencyScore" name="ProcessManagement">
              </label>
              <!-- <button v-on:click="ProcessManagementComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(30)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Strategic Agility</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[30].StrategicAgility" v-bind:value="3" style="margin-right: 10px" v-bind:title="30" type="radio" v-on:change="updateCompetencyScore" name="StrategicAgility">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[30].StrategicAgility" v-bind:value="2" style="margin-right: 10px" v-bind:title="30" type="radio" v-on:change="updateCompetencyScore" name="StrategicAgility">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[30].StrategicAgility" v-bind:value="0" v-bind:title="30" type="radio" v-on:change="updateCompetencyScore" name="StrategicAgility">
              </label>
              <!-- <button v-on:click="StrategicAgilityComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(31)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Technical Learning</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[31].TechnicalLearning" v-bind:value="3" style="margin-right: 10px" v-bind:title="31" type="radio" v-on:change="updateCompetencyScore" name="TechnicalLearning">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[31].TechnicalLearning" v-bind:value="2" style="margin-right: 10px" v-bind:title="31"  type="radio" v-on:change="updateCompetencyScore" name="TechnicalLearning">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[31].TechnicalLearning" v-bind:value="0" v-bind:title="31" type="radio" v-on:change="updateCompetencyScore" name="TechnicalLearning">
              </label>
              <!-- <button v-on:click="TechnicalLearningComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(32)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Time Management</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[32].TimeManagement" v-bind:value="3" style="margin-right: 10px" v-bind:title="32" type="radio" v-on:change="updateCompetencyScore" name="TimeManagement">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[32].TimeManagement" v-bind:value="2" style="margin-right: 10px" v-bind:title="32" type="radio" v-on:change="updateCompetencyScore" name="TimeManagement">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[32].TimeManagement" v-bind:value="0" v-bind:title="32" type="radio" v-on:change="updateCompetencyScore" name="TimeManagement">
              </label>
              <!-- <button v-on:click="TimeManagementComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(33)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Timely Decision Making</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[33].TimelyDecisionMaking" v-bind:value="3" style="margin-right: 10px" v-bind:title="33" type="radio" v-on:change="updateCompetencyScore" name="TimelyDecisionMaking">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[33].TimelyDecisionMaking" v-bind:value="2" style="margin-right: 10px" v-bind:title="33" type="radio" v-on:change="updateCompetencyScore" name="TimelyDecisionMaking">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[33].TimelyDecisionMaking" v-bind:value="0" v-bind:title="33" type="radio" v-on:change="updateCompetencyScore" name="TimelyDecisionMaking">
              </label>
              <!-- <button v-on:click="TimelyDecisionMakingComment">Comment</button> -->
          </fieldset>          
          <fieldset v-if="CompetenciesArrayIDs.includes(34)" :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Written Communication</b></legend>
              <label><b>EE</b>
              <input v-model="CompetencyScores[34].WrittenCommunication" v-bind:value="3" style="margin-right: 10px" v-bind:title="34" type="radio" v-on:change="updateCompetencyScore" name="WrittenCommunication">
              </label>
              <label><b>PW</b>
              <input v-model="CompetencyScores[34].WrittenCommunication" v-bind:value="2" style="margin-right: 10px" v-bind:title="34" type="radio" v-on:change="updateCompetencyScore" name="WrittenCommunication">
              </label>
              <label><b>NI</b>
              <input v-model="CompetencyScores[34].WrittenCommunication" v-bind:value="0" v-bind:title="34" type="radio" v-on:change="updateCompetencyScore" name="WrittenCommunication">
              </label>
              <!-- <button v-on:click="WrittenCommunicationComment">Comment</button> -->
          </fieldset>          
        </div>                   
    </fieldset>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // CompetencyScores: [
      //   {Approachability: ''},
      //   {ActionOriented: ''},
      //   {ActionOriented: ''},
      //   {BuildingEffectiveTeams: ''},
      //   {BusinessAcumen: ''},
      //   {Composure: ''},
      //   {ConflictManagement: ''},
      //   {CustomerFocus: ''},
      //   {DealingWithAmbiguity: ''},
      //   {DealingWithParadox: ''},
      //   {Delegation: ''},
      //   {DevelopingDirectReports: ''},
      //   {DirectingOthers: ''},
      //   {DriveForResultsm: ''},
      //   {FunctionalTechnicalSkills: ''},
      //   {Informing: ''},
      //   {InterpersonalSavvy: ''},
      //   {LearningOnTheFly: ''},
      //   {Listening: ''},
      //   {ManagingVisionAndPurpose: ''},
      //   {MotivatingOthers: ''},
      //   {Organization: ''},
      //   {Patience: ''},
      //   {PeerRelationships: ''},
      //   {Perserverance: ''},
      //   {Perspective: ''},
      //   {Planning: ''},
      //   {PresentationSkills: ''},
      //   {PrioritySetting: ''},
      //   {ProblemSolving: ''},
      //   {ProcessManagement: ''},
      //   {StrategicAgility: ''},
      //   {TechnicalLearning: ''},
      //   {TimeManagement: ''},
      //   {TimelyDecisionMaking: ''},
      //   {WrittenCommunication: ''}
      // ]  
      // CompetencyScores: {
      //   Approachability: '',
      //   ActionOriented: '',
      //   BuildingEffectiveTeams: '',
      //   BusinessAcumen: '',
      //   Composure: '',
      //   ConflictManagement: '',
      //   CustomerFocus: '',
      //   DealingWithAmbiguity: '',
      //   DealingWithParadox: '',
      //   Delegation: '',
      //   DevelopingDirectReports: '',
      //   DirectingOthers: '',
      //   DriveForResults: '',
      //   FunctionalTechnicalSkills: '',
      //   Informing: '',
      //   InterpersonalSavvy: '',
      //   LearningOnTheFly: '',
      //   Listening: '',
      //   ManagingVisionAndPurpose: '',
      //   MotivatingOthers: '',
      //   Organization: '',
      //   Patience: '',
      //   PeerRelationships: '',
      //   Perserverance: '',
      //   Perspective: '',
      //   Planning: '',
      //   PresentationSkills: '',
      //   PrioritySetting: '',
      //   ProblemSolving: '',
      //   ProcessManagement: '',
      //   StrategicAgility: '',
      //   TechnicalLearning: '',
      //   TimeManagement: '',
      //   TimelyDecisionMaking: '',
      //   WrittenCommunication:''
      // }
    }    
  },
  computed: {
    ScoreStatusID: {
      get () {
        console.log(this.$store.state.ScoreStatusID);
        
        if (this.$store.state.ScoreStatusID == 2) {
          console.log(this.$store.state.ScoreStatusID);
          return true;
        } 
        else {
          return false;
        }               
      }
    }, 
    Competencies: {
      get () {
        console.log(this.$store.state.Competencies);
        return this.$store.state.Competencies;
      }
    },
    CompetenciesArray: {
      get () {
        console.log(this.$store.state.CompetenciesArray);
        return this.$store.state.CompetenciesArray;
      }
    },
    CompetenciesArrayIDs: {
      get () {
        // console.log(this.$store.state.CompetenciesArrayIDs);
        return this.$store.state.CompetenciesArrayIDs;
      }
    },
    CompetencyScores: {
      get () {
        console.log(this.$store.state.CompetencyScores);
        return this.$store.state.CompetencyScores;
      }
    }    
  },
  methods: {
    updateCompetencyScore (e) {
      console.log(e);
      
      var competencyScoresIndexKeyValue = {index: '', key: '', value: ''},
          compentencyScore, 
          competencyScoreArray = [0,0,0,0,0,0,0,0],
          count = 0;

      competencyScoresIndexKeyValue.index = e.target.title;
      competencyScoresIndexKeyValue.key = e.target.name;
      competencyScoresIndexKeyValue.value = e.target.value;
      console.log(competencyScoresIndexKeyValue);
      this.$store.commit('setCompetencyScores', competencyScoresIndexKeyValue);

      //  = this.$store.state.CompetenciesArray.reduce((a, b) => a + b);

      console.log(competencyScoreArray);
      console.log(this.$store.state.CompetencyScores);
      
      for (let cmptncyScore of this.$store.state.CompetencyScores) {
        if (cmptncyScore[Object.keys(cmptncyScore)[0]] != "") {
          console.log(cmptncyScore);
          competencyScoreArray[count] = parseInt(cmptncyScore[Object.keys(cmptncyScore)[0]]);
          count++;
        }
      }

      console.log(competencyScoreArray);
      this.$store.commit('setCompetenciesArray', competencyScoreArray);
      compentencyScore = this.$store.state.CompetenciesArray.reduce((a, b) => a + b);

      
      // if competencyArrayIDs array contains 7 elements => if compentencyScore < 13 'setCompetencies' to 0, else if compentencyScore > 15 'setCompetencies'to 33, else case 13:, case 14:, case 15: 'setCompetencies' to 30
      if (this.$store.state.CompetenciesArrayIDs.length === 7) {
        console.log(`after UpdaTE Competencies Score: ${compentencyScore}`);
        if (compentencyScore < 13) {
          this.$store.commit('setCompetencies', 0);
        }
        else if (compentencyScore > 15) {
          this.$store.commit('setCompetencies', 33);
        }
        else {
          switch (compentencyScore) {
            case 13:
            case 14:
            case 15:
              this.$store.commit('setCompetencies', 30);
            break;
            default: 
              alert('MISSSED a Productivity score possibility'); 
              console.log('MISSSED a possibility');
              break;
          }
        }            
      }

      // if competencyArrayIDs array contains 8 elements => if compentencyScore < 15 'setCompetencies' to 0, else if compentencyScore > 17 'setCompetencies'to 33, else case 15:, case 16:, case 17: 'setCompetencies' to 30
      else {
        console.log(`Competencies Score: ${compentencyScore}`);
        if (compentencyScore < 15) {
          this.$store.commit('setCompetencies', 0);
        }
        else if (compentencyScore > 17) {
          this.$store.commit('setCompetencies', 33);
        }
        else {
          switch (compentencyScore) {
            case 15:
            case 16:
            case 17:
              this.$store.commit('setCompetencies', 30);
            break;
            default: 
              alert('MISSSED a Productivity score possibility'); 
              console.log('MISSSED a possibility');
              break;
          }
        }     
      }

      console.log(this.$store.state.CompetenciesArray);
      this.persistCompetencyScore(this.$store.state.CompetenciesArray);
    },
    insertCompetencyScoresByMasterIdPromise (masterscoreID, competencyArrayIDs, competencyScoreValues, competencyScoreComments) {
      fetch('http://apcc-srvm-01:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation InsertCompetencyScoresByMasterID(    
                $masterScoreID: Int, 
                $competencyArrayIDs: [Int], 
                $competencyScoreValues: [Int],                 
                $competencyScoreComments: [[Int]],              
              ) {
                  insertCompetencyScoresByMasterID(            
                    masterScoreID: $masterScoreID, 
                    competencyArrayIDs: $competencyArrayIDs, 
                    competencyScoreValues: $competencyScoreValues,
                    competencyScoreComments: $competencyScoreComments 
                  ) {
                      masterScoreID,
                      competencyArrayIDs,
                      competencyScoreValues,
                      competencyScoreComments                  
                    }
            }`, 
                variables: { "masterScoreID": masterscoreID, "competencyArrayIDs": competencyArrayIDs, "competencyScoreValues": competencyScoreValues,
                "competencyScoreComments": competencyScoreComments }
        })
      })
      .then(res => res.json())
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });          
    },
    persistCompetencyScore (competenciesArray) {
      var masterScoreId = this.$store.state.MasterScoreId;
      console.log(`Master scoreID: ${masterScoreId}`);      

      this.insertCompetencyScoresByMasterIdPromise (masterScoreId, this.$store.state.CompetenciesArrayIDs, competenciesArray, [[],[],[],[],[],[],[],[]]);

      var query = `mutation competencyScoreByMasterScoreId($MasterScoreID: Int!, $CompetencyScoreValues: [Int]!) {competencyScoreByMasterScoreId(masterScoreID:$MasterScoreID, competencyScoreValues: $CompetencyScoreValues){competencyScoreValues}}`;

      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query,
          variables: { "MasterScoreID": masterScoreId, "CompetencyScoreValues": competenciesArray }
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log (data);        
      });
    },    
    // setInitialDataValues () {
    //   for (let competency in this.CompetencyScores) {
    //     var competencyArrayIndex = 0;
    //     // console.log(competency);
    //     // console.log(this.CompetencyScores[competency]);
    //     // console.log(this.CompetenciesArrayIDs.includes(competency));
    //     if (this.CompetenciesArrayIDs.includes(competency)) {
    //       for (key in this.CompetencyScores[competency]) {
    //         // console.log(key);
    //         this.CompetencyScores[competency][key] = this.CompetenciesArray[competencyArrayIndex];
    //         competencyArrayIndex++;
    //       }           
    //     }                
    //   }
    //   // console.log(this.CompetencyScores);
    // }
  }
}
</script>