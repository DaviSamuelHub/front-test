localStorage.setItem("paginaAtual", 1);

// Executar ao carregar
$(document).ready(function () {
  //   pagina = localStorage.getItem("paginaAtual");
  consultar(localStorage.getItem("paginaAtual"));
});

// Executar ao clicar
$(document).on("click", "#prev", function () {
  var pagAtual = parseInt(localStorage.getItem("paginaAtual")) - parseInt(1);
  consultar(localStorage.setItem("paginaAtual", pagAtual));
});

$(document).on("click", "#next", function () {
  var pagAtual = parseInt(localStorage.getItem("paginaAtual")) + parseInt(1);
  consultar(localStorage.setItem("paginaAtual", pagAtual));
});

// Função
function consultar(pag) {
  pag = localStorage.getItem("paginaAtual");
  $(".table").css("display", "none");
  $(".btn-group").css("display", "none");

  $(".listagem").css("display", "none");

  $(".carregar-dados").append(
    '<span class="loader"></span><p id="msg">Aguarde, carregando..</p>'
  );

  $("#retorno").empty();

  $.ajax({
    dataType: "JSON",
    method: "GET",
    url: "https://swapi.dev/api/people/?page=" + pag,

    success: function (item) {
      //Se não existir mais páginas a frente
      if (item["next"] === null) {
        $("#next").css("display", "none");
      } else {
        $("#next").css("display", "initial");
      }

      //Se não existir mais páginas para trás
      if (item["previous"] === null) {
        $("#prev").css("display", "none");
      } else {
        $("#prev").css("display", "initial");
      }

      $(".listagem").css("display", "initial");
      $(".table").css("display", "table");
      $(".table").css("z-index", "0");
      $(".btn-group").css("display", "initial");
      $(".table").css("margin-top", "-125px");

      $(".loader").remove();
      $("#msg").remove();
      // console.log(item['results']);

      $(".listagem").empty();
      $(".listagem").append(
        "Listagem: " + localStorage.getItem("paginaAtual") + ""
      );

      // Listagem
      var contagem = $(".listagem")[0].innerText;
      var somaNum = contagem.replace("Listagem:", "") + 0;
      var contagemAtual = parseInt(somaNum) - parseInt(10);

      for (var x = 0; x < item["results"].length; x++) {
        var valor = parseInt(x) + parseInt(contagemAtual + 1);
        localStorage.setItem("ultimaListagem", valor);

        $("#retorno").append(
          '<tr><th scope = "row">' +
            valor +
            "</th><td>" +
            item["results"][x]["name"] +
            "</td><td>" +
            item["results"][x]["height"] +
            "m</td><td>" +
            item["results"][x]["mass"].replace("unknown", "Não Informado") +
            "Kg</td><td>" +
            item["results"][x]["birth_year"]
              .replace("BBY", " Anos")
              .replace("unknown", "Não Informado") +
            "</td><td>" +
            item["results"][x]["gender"].replace("n/a", "Não Informado") +
            "</td><td><button type='button' class='btn btn-dark detalhes-person'>Detalhes <div id='cod-person'>" +
            valor +
            "</div></button></td></tr>"
        );
      }

      $(document).ready(function () {
        var btn = document.querySelectorAll(".detalhes-person");

        for (var p = 0; p < btn.length; p++) {
          btn[p].addEventListener("click", function () {
            var person = this.innerText.replace("Detalhes", "");

            var btnClicado = this;

            $(this).css("color", "transparent");
            $(this).append('<span class="loader-spinner"></span>');

            var url = "https://swapi.dev/api/people/" + person;
            // Ajax
            $.ajax({
              dataType: "JSON",
              method: "GET",
              url: url,

              success: function (result) {
                $(btnClicado).css("color", "#FFF");
                $(".loader-spinner").remove();

                // console.log(result);

                if (result["gender"] === "female") {
                  result["gender"] = "Feminino";
                } else if (result["gender"] === "male") {
                  result["gender"] = "Masculino";
                }

                var filmes = [];
                var homeworld = [];

                //Listando os Filmes
                for (var f = 0; f < result["films"].length; f++) {
                  $.ajax({
                    dataType: "JSON",
                    method: "GET",
                    url: result["films"][f],

                    success: function (films) {
                      // console.log(films["title"]);
                      var arrFilmes = {
                        filmes: films["title"],
                      };

                      filmes.push(arrFilmes.filmes);
                    },
                  });
                }

                //Listando Endereço
                $.ajax({
                  dataType: "JSON",
                  method: "GET",
                  url: result["homeworld"],

                  success: function (home) {
                    // console.log(films["title"]);
                    var arrResidencial = {
                      local: home["name"],
                      rotacao: home["rotation_period"],
                      orbita: home["orbital_period"],
                      diametro: home["diameter"],
                      clima: home["climate"],
                      gravidade: home["gravity"],
                      terreno: home["terrain"],
                      superficieAgua: home["surface_water"],
                      populacao: home["population"],
                    };

                    homeworld.push(
                      "Local: " + arrResidencial.local,
                      " Rotação: " + arrResidencial.rotacao,
                      " Orbita: " + arrResidencial.orbita,
                      " Diâmetro: " + arrResidencial.diametro,
                      " Clima: " + arrResidencial.clima,
                      " Gravidade: " + arrResidencial.gravidade,
                      " Terreno: " + arrResidencial.terreno,
                      " Superficie Aquatica: " + arrResidencial.superficieAgua,
                      " População: " + arrResidencial.populacao
                    );
                  },
                });

                var dados = {
                  nome: result["name"],
                  idade: result["birth_year"],
                  altura: result["height"],
                  genero: result["gender"],
                  corPele: result["skin_color"],
                  olhos: result["eye_color"],
                  peso: result["mass"],
                  filmes: filmes,
                  residencial: homeworld,
                };

                var descricaoBasica =
                  result["name"] +
                  " tem " +
                  result["birth_year"].replace("BBY", "Anos de idade") +
                  ", cor dos olhos em " +
                  result["eye_color"] +
                  " e tem " +
                  result["height"] +
                  "m de altura. Até então, se identifica como do sexo " +
                  result["gender"] +
                  ".";

                Swal.fire({
                  icon: "info",
                  title: "Informações de " + result["name"],
                  text: descricaoBasica,
                  footer:
                    'Para informações mais detalhadas,<b>acesse</b> o nosso <a target="_blank" href="' +
                    url +
                    '"> Link</a>',

                  showCloseButton: true,
                  showCancelButton: true,
                  focusConfirm: true,
                  allowOutsideClick: false,
                  confirmButtonText: "Baixar em PDF",
                  cancelButtonText: "Fechar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    // Instanciar objeto jsPDF
                    const { jsPDF } = window.jspdf;
                    var doc = new jsPDF();

                    // Logomarca empresa
                    var imgData =
                      "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";

                    // CENTRO - TOP - RIGHT - BOTTON

                    // Titulo
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text("Relatório detalhado do personagem,", 20, 30);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text(dados.nome, 20, 37);

                    // Logomarca + Linha
                    doc.addImage(imgData, "JPEG", 120, 15, 75, 30);
                    doc.setLineWidth(0.3);
                    doc.setDrawColor("22234a");
                    doc.line(20, 40, 125, 40);

                    // Nome
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text("Nome: " + dados.nome, 20, 55);

                    // Idade
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("e00");
                    doc.text("Idade: " + dados.idade, 20, 63);

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text("ALtura: " + dados.altura, 20, 71);

                    // Genero
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text("Genero: " + dados.genero, 20, 79);

                    //Cor da Pele
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text("Cor da Pele: " + dados.corPele + "", 20, 87);

                    //Filmes
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text("Filmes: " + dados.filmes + "", 20, 95);

                    //Endereco
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text("Endereço", 20, 103);

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text(dados.residencial[0] + "", 25, 111);

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text(dados.residencial[1] + "", 25, 119);

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text(dados.residencial[2] + "", 25, 127);

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text(dados.residencial[3] + "", 25, 135);

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text(dados.residencial[4] + "", 25, 143);

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text(dados.residencial[5] + "", 25, 151);

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text(dados.residencial[6] + "", 25, 159);

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text(dados.residencial[7] + "", 25, 167);

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text(dados.residencial[8] + "", 25, 175);

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text("Descrição Básica" + "", 20, 188);

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor("22234a");
                    doc.text(descricaoBasica + "", 20, 196);

                    doc.setTextColor("e00");
                    doc.setFontSize(9);
                    doc.text(
                      "Av, Professor Magalhães Neto, 1570 - Pituba  | Salvador-BA",
                      55,
                      275
                    );
                    doc.text(
                      "Segunda a Sexta: 08h às 18h - Sábado: 08h às 14h -  Domingo: Fechado",
                      45,
                      280
                    );
                    doc.text("email@exemplo.com.br | (71) 3186-5900", 67, 285);
                    doc.text(
                      "Insta: grupognc.oficial | Face: GrupoGnc ",
                      66,
                      290
                    );

                    // Salvando Reletório
                    doc.save("relatorio_" + dados.nome + ".pdf");
                    // fim relatorio

                    Swal.fire(
                      "Arquivo PDF gerado, efetuando download!",
                      "",
                      "success"
                    );
                  }
                });
                // Fim
              },

              error: function () {
                alert("Erro");
              },
            });
            //
          });
        }
      });
    },

    error: function () {
      $(".loader").remove();
      $("#msg").remove();

      $(".carregar-dados").append(
        '<span class="msg-erro"><img src="img/erro-load.svg"></span><p id="msg">Desculpe, algo deu errado. Tente novamente!</p>'
      );
    },
  });
}
