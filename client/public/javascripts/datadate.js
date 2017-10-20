let idedit = ""
$(document).ready(function(){
  onClickClose()
  drawTable()
  formatdate()
  save()
  remove()
  edit()
  search()
})

function onClickClose(){
  $(function(){
    $('#addbtn').click(function(){
      $('#addpanel').toggle()
    })
  })
}

function formatdate() {
  $("#datepicker").datepicker({
    dateFormat: 'yy-mm-dd'
  });
  $("#datepickeradd").datepicker({
    dateFormat: 'yy-mm-dd'
  });
}

function table(data){

  data.sort(function(a,b){
    return a.letter>b.letter ? 1: a.letter<b.letter ?-1:0
  })

  let html = ""
  for(let i=0;i<data.length;i++){
    html += `<tr>`
    html += `<td>` +data[i]._id+ `</td>`
    html += `<td>` +data[i].letter+ `</td>`
    html += `<td>`+data[i].frequency+ `</td>`
    html += `<td>`
    html +=`<button class="btn btn-success btn-edit" type="button" data-id="${data[i]._id}"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>&nbsp`
    html +=`<button class="btn btn-danger btn-delete" type="button" data-id="${data[i]._id}"><i class="fa fa-trash" aria-hidden="true"></i>  Delete</button>`
    html += `</td>`
    html += `</tr>`
  }
  $("#data-table tbody").html(html)
}

function drawTable(){
  $.get("http://localhost:3001/api/datadate",function(data){
    table(data)
  })
}


function search(){
  $('#search-form input').on("change",function(e){
    console.log(e.target.value);
    if(e.target.value){
      $.ajax({
        method:'post',
        url:"http://localhost:3001/api/datadate/search",
        data:$(this).serialize()
      })
      .done(function(data){
        table(data)
      })
    }else{
      drawTable()
    }
  })
}

function save(){
  $('#data-form').submit(function(e){
    e.preventDefault()
    if(idedit != ""){
      $.ajax({
        method:"put",
        url:"http://localhost:3001/api/datadate/"+idedit,
        data:$(this).serialize()
      })
      .done(function(data){
        idedit = ""
        $('#data-form input').val("")
        $('#addpanel').hide()
        $('#message').show()
        $('#textmessage').val("DataDate Updated")
        drawTable()
      })
    }else{
      $.ajax({
        method:"post",
        url:"http://localhost:3001/api/datadate",
        data:$(this).serialize()
      })
      .done(function(data){
        idedit = ""
        $('#data-form input').val("")
        $('#addpanel').hide()
        drawTable()
      })
    }
    return false
  })
}

function remove(){
  $("#data-table tbody").on( "click",".btn-delete",function() {
    $("#btn-delete").attr("data-id",$(this).attr("data-id"))
    $('#confirm-delete').modal('show')
  })

  $("#btn-delete").click(function(){
    $.ajax({
      method:"delete",
      url:"http://localhost:3001/api/datadate/"+$(this).attr("data-id")
    })
    .done(function(data){
      $('#confirm-delete').modal('hide')
      drawTable()
    })
  })
}

function edit() {
  $("#data-table tbody").on("click",".btn-edit",function(){
    $.get("http://localhost:3001/api/datadate/"+$(this).attr("data-id"),function(data){
      console.log(moment(data.data.letter).format("YYYY-MM-DD"));
      $('.letter').val(moment(data.data.letter).format("YYYY-MM-DD"))
      $('#frequency').val(data.data.frequency)
      idedit = data.data._id
      $('#addpanel').show()
    })
  })
}
