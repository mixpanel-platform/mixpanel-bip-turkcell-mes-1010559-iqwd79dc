//global vairables
var revenueCell
var roiCell
var campaign 
var campaignSpendCell 
//make revenue cell editable

function editRevCell(){
  $('#marketing-table #column-campaign-spends').on( 'click', function () {
    //pulling the name of the campaign from the first column in the chart 
   
    campaign = $(this).siblings().html()
    campaignSpendCell = $(this) // get the cell the user clicked on to enter campaign spend

    roiCell = $(this).next().next() //get the corresponding ROI cell and store value to later replace
    var campaignEdited = $(this).prev().prev().prev().prev().prev().prev().prev().text()
    console.log('campaign edited', campaignEdited)
    revenueCell = $(this).next().text() //get the corresponding revenue cell and store value to later do ROI math with
    $('#revenue-modal').modal('show')
    $('#camp-spend-modal-save').on('click',function(){
      var campaignAmount = $('#campaign-spend-input').val()
      console.log("user input- ", typeof campaignAmount)
      var inputType = parseInt(campaignAmount)
      console.log('parseInt - ', inputType)
      if (campaignAmount === undefined || campaignAmount == null){ //check to make sure a value was entered before closing the modal, if not keep the model open
      campaignAmount = $('#revenue-modal').modal('show')
      }else{
        //send out track call to store campaign spend data
        mixpanel.track('campaign_spend_entered',{'details':{
          'campaign': campaignEdited,
          'spend': campaignAmount
        }})
        _.each(dataSet, function(arrayValue){

          if(arrayValue[0] === campaign){
            //arrayValue[5] = campaignAmount

            campaignSpendCell.text(addCommas(campaignAmount))
            campaignSpendCell.attr('class','')
            console.log('campaign amount after adding commas',campaignAmount)
            revenueCell = parseInt(revenueCell.replace(/,/g , ""))
            
            var roiCalc = (((revenueCell-campaignAmount)/campaignAmount)*100).toFixed(0) +"%"
            roiCell.text(roiCalc)
          }
        }) 
      }
    //update tablesorter cache so that after a per enters in campaign spend the table can be resorted properly
    $("#marketing-table").trigger("update");
    })
    //logic to gather value from user and apply to chart to calculate ROI
    //var campaignAmount = prompt("Please Enter the Campaign Amount for " + campaign)
    
  });
}