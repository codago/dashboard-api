let idedit = ""
$(document).ready(function(){
  onClickClose()
  drawTable()
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

function table(data){
  let html = ""
  for(let i=0;i<data.length;i++){
    html += `<tr>`
    html += `<td>` +data[i]._id+ `</td>`
    html += `<td>` +data[i].title+ `</td>`
    html += `<td>` +data[i].lat+ `</td>`
    html += `<td>` +data[i].lng+ `</td>`
    html += `<td>`
    html +=`<button class="btn btn-success btn-edit" type="button" data-id="${data[i]._id}">Edit</button>&nbsp`
    html +=`<button class="btn btn-danger btn-delete" type="button" data-id="${data[i]._id}">Delete</button>`
    html += `</td>`
    html += `</tr>`
  }
  $("#data-table tbody").html(html)
}

function drawTable(){
  $.get("http://localhost:3001/api/maps",function(data){
    table(data)
  })
}

function search(){
  $('#search-form input').on("input",function(e){
    if(e.target.value){
      $.ajax({
        method:'post',
        url:"http://localhost:3001/api/maps/search",
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
        url:"http://localhost:3001/api/maps/"+idedit,
        data:$(this).serialize()
      })
      .done(function(data){
        idedit = ""
        $('#data-form input').val("")
        $('#addpanel').hide()
        drawTable()
      })
    }else{
      $.ajax({
        method:"post",
        url:"http://localhost:3001/api/maps",
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
      url:"http://localhost:3001/api/maps/"+$(this).attr("data-id")
    })
    .done(function(data){
      $('#confirm-delete').modal('hide')
      drawTable()
    })
  })
}

function edit() {
  $("#data-table tbody").on("click",".btn-edit",function(){
    $.get("http://localhost:3001/api/maps/"+$(this).attr("data-id"),function(data){
      $('#title').val(data.data.title)
      $('#latitude').val(data.data.lat)
      $('#longitude').val(data.data.lng)

      idedit = data.data._id
      $('#addpanel').show()
    })
  })
}
