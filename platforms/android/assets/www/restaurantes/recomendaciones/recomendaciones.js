$(document).ready(function(){
            /*  retorna recomendaciones por usuario*/
             var url= "http://35.192.11.211:443/recommender/rest/ratings/ACAO/"+localStorage.getItem("userId");
             $.ajax({  
                   type: "GET",  
                   url: url,  
                   dataType: "json",  
                   success: function(result){  
                     // we have the response  
                     if(result["recommendations"].length > 1){
                         var restaurantes=[];
                            var obj=result["recommendations"];
                            for(i in obj){
                              var temp=[];
                              temp.push(obj[i].user);
                              temp.push(obj[i].restaurant);
                              temp.push(obj[i].recomendation);
                             restaurantes.push(temp);
                              }
                            fillHTMLList(restaurantes);
                     }else{
                         var restaurantes=[];
                         var temp=[];
                         $.each(result["recommendations"], function(i, field){
                             switch(i) {
                                case "user":
                                    temp.push(field);
                                    break;
                                case "restaurant":
                                    temp.push(field);
                                    break;
                                case "recomendation":
                                    temp.push(field);
                                    break;
                                default:
                                    alert("non data");
                            }
                         });
                         restaurantes.push(temp);
                         fillHTMLList(restaurantes);
                     }
                   },  
                   error: function(e){  
                     alert('Para hacer recomendaciones necesitamos saber sus gustos. Favor vote por algun restaurante cercano.');  
                   }  
                 });
         });
     
        function fillHTMLList(array){
            $(document).ready(function(){
                  var url="http://35.192.11.211/Restaurant_Recomend/database/restaurant_management/return_rest_data_array.php";
                 $.getJSON(url,function(result){
                     //alert(localStorage.getItem("latitude")+" "+localStorage.getItem("longitude"));
                     //console.log(result);
                     $.each(result, function(i, field){
                         for (i = 0; i < array.length; i++) {
                             if((array[i][1]) == field.restaurant_id){
                                 $("#listview").append('<div onclick="details('+(array[i][1])+')" class="progress" style="height: 50px;"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="'+((array[i][2])*20)+'" aria-valuemin="0" aria-valuemax="100" style="width:'+((array[i][2])*20)+'%;"><h5 align="center" class="title">'+field.name+' </h5><span class="label label-primary"> '+((array[i][2])*20)+' % Recomendado.</span></div></div>'); 
                             }
                         }
                    });
                 });
            });
        }
     
        function details(restaurant_id){
            $("#listview").css("display", "none");
            $("#Restaurant_Details").css("display", "block");
            $('#Iframe_details').attr('src', "../detalle-restaurante/restaurante_detalle.html?id="+restaurant_id); 
        }