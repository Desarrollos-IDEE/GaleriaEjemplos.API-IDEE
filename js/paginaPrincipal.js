


$(document).ready(function(){
    $("#keywords").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#examples div").filter(function() {
        $(this).toggle( $(this).text().toLowerCase().indexOf(value) > -1 );
      });
    });

    if (window.location.href.includes('?')) {
        const params = window.location.href.indexOf('?') > -1 ? window.location.href.split('?')[1] : undefined;
        const arrayParams = params.split('&');
        arrayParams.forEach((param) => {
            if (param.indexOf('q') > -1) {
                let valuesq = decodeURIComponent(param.split('=')[1]);
                console.log(valuesq)
                valuesq = valuesq.replace(/%20/g,' ');
                valuesq = valuesq.replace(/%2B/g,' ');
                valuesq = valuesq.replace(/\+/g,' ');
                $("#examples div").filter(function() {
                  $(this).toggle( $(this).text().toLowerCase().indexOf(valuesq.toLowerCase()) > -1  )
                });
                const buscador = document.getElementById("keywords")
                buscador.value = valuesq
            }
        });
    }
  });


 

 