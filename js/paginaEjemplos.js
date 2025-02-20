

function submitTryit() {

  if (window.editor) {
    window.editor.save();
  }

  var text = document.getElementById("textareaCode").value;
  var ifr = document.createElement("iframe");
  ifr.setAttribute("frameborder", "0");
  ifr.setAttribute("id", "iframeResult");
  ifr.setAttribute("name", "iframeResult");  
  ifr.setAttribute("allowfullscreen", "true");  
  ifr.style['height'] = "89vh";
  ifr.style['width'] = "49vw";
  document.getElementById("iframewrapper").innerHTML = "";
  document.getElementById("iframewrapper").appendChild(ifr);

  var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
  ifrw.document.open();
  ifrw.document.write(text);  
  ifrw.document.close();
};

function cambiarColorCodigo(){
  window.editor = CodeMirror.fromTextArea(document.getElementById("textareaCode"), {
    mode: "htmlmixed",
    htmlMode: true,
    lineWrapping: true,
    lineNumbers: true,  

  });
  if (editor.options.lineWrapping == false){
    var noWrap = document.getElementById("textareawrapper")
    noWrap.classList.remove("CodeMirror-wrap")
    var hijoBarrita = document.getElementsByClassName("CodeMirror-hscrollbar")[0].childNodes[0]
    hijoBarrita.style["width"]="1000px"
  }
  window.editor.save()
};

function retheme() {
  var cc = document.body.className;
  if (cc.indexOf("darktheme") > -1) {
    document.body.className = cc.replace("darktheme", "");
    if (opener) {opener.document.body.className = cc.replace("darktheme", "");}
    localStorage.setItem("preferredmode", "light");
  } else {
    document.body.className += " darktheme";
    if (opener) {opener.document.body.className += " darktheme";}
    localStorage.setItem("preferredmode", "dark");
  }
}
(function setThemeMode() {
    var x = localStorage.getItem("preferredmode");
    if (x == "dark") {
      document.body.className += " darktheme";
    }
});

function reCodigo(){
    var noWrap_id = document.getElementById("textareawrapper")
    var noWrap = document.getElementsByClassName("CodeMirror cm-s-default")
    var noWrapScroll = document.getElementsByClassName("CodeMirror-hscrollbar")[0]
    
    if ( noWrap_id.classList.value.includes("CodeMirror-wrap")) {
        for (let i = 0; i < noWrap.length; i++) {
          noWrap[i].classList.remove("CodeMirror-wrap")
        }
        noWrapScroll.classList.remove("CodeMirror-wrap")
        // var hijoBarrita = document.getElementsByClassName("CodeMirror-hscrollbar")[0].childNodes[0]
        // hijoBarrita.style["width"]="1000px"
    }else{
        for (let i = 0; i < noWrap.length; i++) {
          noWrap[i].className += " CodeMirror-wrap";
          
        }
        noWrapScroll.className += " CodeMirror-wrap";
    }
    let textArea = document.getElementsByTagName('TEXTAREA')[1]
    textArea.focus()
    textArea.value = " "
    setTimeout(
      function(){ 
        textArea.value = ""
      }, 
      100
    );


}


window.onload = function() {
  cambiarColorCodigo();
  submitTryit();
  reCodigo();
  var aa = document.getElementsByClassName("CodeMirror-vscrollbar")[0]
  aa.scrollTo(0,aa.scrollHeight)
  // aa.scrollTo(0,0)
  setTimeout(function(){ aa.scrollTo(0,0)}, 10);
};