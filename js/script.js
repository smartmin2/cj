//--------------------------------------------------------------


//------------------ Table --------------------------
// Add Table data(tableClass or tableBodyClass, arrData, is Checkbox?)
function addRow(table, tbData, isCheckbox) {    
  var tr = document.createElement("tr");

  if (isCheckbox) {
    var input = document.createElement("input");
    var ckTD=document.createElement("td");

    input.setAttribute("type","checkbox");
    input.setAttribute("class","table_body_check");
    ckTD.appendChild(input);
    tr.appendChild(ckTD);
  }
  
  tbData.map((cell,i) => {        
    var newTD = document.createElement("td"); 
    if (cell == 'attach')
    {      
      var attach = document.createElement("input");
      attach.setAttribute("type","number");      
      newTD.appendChild(attach);
    }
    else newTD.innerText = cell;
    
    tr.appendChild(newTD);    
  });  
  table.appendChild(tr); 
}
//--------------------------------------------------------
//------------------ Modal --------------------------
$(".modal-open").on('click',function(){
  $("#modal-background").fadeIn(300);
  $(".modal-con").css("display", "flex").hide().fadeIn();
  $("body").css("overflow", "hidden");
});

$("#modal-background, .close").on('click',function(){
  if ($("#modal-background2").css("display") == "block") return;
  if ($(this).hasClass("close") || !$(this).next().hasClass('modal-progress'))
  {
    $("#modal-background").fadeOut(300);
    $(".modal-con").fadeOut(300);  
    $('body').css('overflow', 'overlay');
  }
});
$("#modal-background2, .close").on('click',function(){
  if ($(this).hasClass("close"))
  {
    $("#modal-background2").fadeOut(300); 
    $(".modal-con2").fadeOut(300);     
  }
});

function ModalPopup(sName){
  $('#modalDlg').load('../modals/'+sName+'.html .modal-'+sName,function(){
    $('#modalDlg').show();
    $("#modal-background").fadeIn(100);   
    $('.modal-'+sName).show();
    $("body").css("overflow", "hidden");   

    $(".close").on("click",function(){            
      if ($("#modal-background2").css("display") == "block") return;            
      $("#modal-background").fadeOut(300);
      $(".modal-con").fadeOut(300);  
      $('body').css('overflow', 'overlay');   
      $('#modalDlg').hide();         
    })
  });      
  return false;          
}

function ModalPopup2(sName){
  $('#modalDlg2').load('../modals/'+sName+'.html .modal-'+sName,function(){
    $('#modalDlg2').show();
    $("#modal-background2").fadeIn(100);   
    $('.modal-'+sName).show();    

    $(".close").on("click",function(){            
      $("#modal-background2").fadeOut(300); 
      $(".modal-con2").fadeOut(300);             
    })
  });      
  return false;          
}
//--------------------------------------------------------

//------------------ tab --------------------------
$(function () {
  const li = $(".tab .tab-menu");
  li.click(function () {
    const tabId = $(this).attr("data-tab");

    li.removeClass("active");
    $(".tab-content").removeClass("active");

    $(this).addClass("active");
    $("#" + tabId).addClass("active");
  });
});

$(function () {
  const li = $(".tab02 .tab02-menu");
  li.click(function () {
    const tabId = $(this).attr("data-tab");

    li.removeClass("active");
    $(".tab02-content").removeClass("active");

    $(this).addClass("active");
    $("#" + tabId).addClass("active");
  });
});
//--------------------------------------------------------

//------------------ toggle btn --------------------------
$(".btn-toggle").on("click", function () {
  const tg = $(this).parent(".toggle-wrap").find(".btn-toggle");
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
  } else {
    tg.removeClass("active");
    $(this).addClass("active");
  }

  if ($(".request-sv").hasClass("active")) {
    $(".request-sv-row").css("display", "flex");
  }else {
    $(".request-sv-row").css("display", "none");
  }

  const sub = $(this).parent(".toggle-wrap").find(".sub");
  const sub1 = $(this).parent(".toggle-wrap").find(".sub1");
  if ($(this).hasClass("open")) {
    sub.css("display", "flex");
    sub1.css("display", "none");
  } else if ($(this).hasClass("open1")) {
    sub1.css("display", "flex");
    sub.css("display", "none");
  } else {
    sub.css("display", "none");
    sub1.css("display", "none");
  }
});

//--------------------------------------------------------

// 라디오를 버튼으로 
$(".btn-select-group .btn-select").on("click", function(){
  $(this).addClass('active').siblings().removeClass('active');
});
//체크박스를 버튼으로
$(".btn-check-group .btn-check").on("click", function(){
  $(this).toggleClass("active");
})

// 파일
var fileTarget = $('.filebox .upload-hidden'); fileTarget.on('change', function(){ 
  // 값이 변경되면 
  if(window.FileReader){ 
    // modern browser 
    var filename = $(this)[0].files[0].name; 
  } else { 
      // old IE 
      var filename = $(this).val().split('/').pop().split('\\').pop(); 
      // 파일명만 추출 
    } 
    // 추출한 파일명 삽입 
    $(this).siblings('.upload-name').val(filename); 
  });


