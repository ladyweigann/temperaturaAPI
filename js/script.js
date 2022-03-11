
            var btnPesquisar = document.getElementById("btnPesquisar")
            //chamando botão através do evento onclick
                btnPesquisar.onclick = function(){
                let local = document.getElementById("idLocal").value
                let qtdDias = document.getElementById("idNumber").value


                //condição para não aceitar parametros em branco
                if(local != "" && qtdDias != ""){
                    dadosEmVariaveis(local, qtdDias)
                }else{
                    alert("Por favor, selecione um local e/ou dias válidos!")
                }
                
            }

            async function carregarDados(local, qtdDias){
                var response = await fetch("https://weatherapi-com.p.rapidapi.com/forecast.json?q=" + local + "&days=" + qtdDias + "&lang=pt", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
                    "x-rapidapi-key": "1d878e08f2mshc11e6d9940067f0p1074b2jsne392736ca38e"
                }
            })
            return response.json()
        }

        async function dadosEmVariaveis(local, qtdDias) {
            
            var dado = await carregarDados(local, qtdDias)
            console.log(dado);
                
                //preenchendo dados do output do clima do dia 
                
                document.getElementById("idOut").innerHTML = "<p>As condições do tempo para " + dado.location.name + "/" + dado.location.country + " na data de hoje é: </p>" + "<p>" + dado.current.condition.text + "<img src=" + "https:" + dado.current.condition.icon + ">" + "<p>Temperatura Atual: " + dado.current.temp_c + " °C</p>" + "<p> Sensação Térmica: " +  dado.current.feelslike_c + " °C</p>"    

                
                document.getElementById("idTitulo").innerText = "Previsão para os próximos dias: "

                //um laço de repetição para jogar os dados dentro da tabela, de acordo com o length escolhido
                for (let index = 0; index < dado.forecast.forecastday.length; index++) {
                    document.getElementById("idDataTb" + index).innerText = dado.forecast.forecastday[index].date
                    document.getElementById("idMaxTb" + index).innerText = dado.forecast.forecastday[index].day.maxtemp_c
                    document.getElementById("idMinTb" + index).innerText = dado.forecast.forecastday[index].day.mintemp_c
                    document.getElementById("idUmidadeTb" + index).innerText = dado.forecast.forecastday[index].day.avghumidity
                    document.getElementById("idCondTb" + index).innerText = dado.forecast.forecastday[index].day.condition.text
                    
                }

                var tempMedia = dado.current.temp_c

                //condição para alterar o gif animado de acordo com a temperatura atual               
                if(tempMedia >= 22 && tempMedia < 27) {
                    document.getElementById("idGifAnimado").src =  "https://media0.giphy.com/media/5xtDarqlsEW6F7F14Fq/giphy.gif?cid=ecf05e472jy3jszfmu9534oo20qj9i917ld2yqtwi9fiktzc&rid=giphy.gif&ct=g"
                 } else if(tempMedia >= 27) {
                    document.getElementById("idGifAnimado").src = "https://media1.giphy.com/media/26BREnyYXsPOxlUKk/giphy.gif?cid=ecf05e47cet6ycmvdl7k1vpkwatesg8fiq7ed2zkcersotr8&rid=giphy.gif&ct=g"
                 } else if(tempMedia < 22 && tempMedia > 10){
                    document.getElementById("idGifAnimado").src = "https://media3.giphy.com/media/3j1iMLBLz3ZE4pilV4/giphy.gif?cid=ecf05e47cxrz31hvz8k29w9uzrgz8ichlpr4bd5ze645nwy2&rid=giphy.gif&ct=g"
                 } else if(tempMedia <= 10) {
                    document.getElementById("idGifAnimado").src = "https://media1.giphy.com/media/d3mlmtNPoxNrt4Bi/giphy.gif?cid=ecf05e47cxrz31hvz8k29w9uzrgz8ichlpr4bd5ze645nwy2&rid=giphy.gif&ct=g"
                 }
        }
