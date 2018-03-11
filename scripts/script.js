$(function() {

    function creating(data) {
        var info = $("<div></div>").css({
            "padding-left": "10px",
            "display": "flex",
            "flex-direction": "column",
            "justify-content": "space-around"
        });

        var img = $("<div></div>").css({
            "padding-right": "10px",
            "display": "flex",
            "justify-content": "space-around",
            "align-items": "center"
        });

        var first = $("<div></div>").css({
            "width": "500px",
            "float": "left",
            "display": "flex",
            "justify-content": "space-between",
            "height": "200px",
            "border-radius": "5px",
            "background-color": "#eaeaea",
            "margin-bottom": "10px"
        })

        var name = $("<h1></h1>").text(data.name).css({
            "text-transform": "capitalize"
        });
        var description = $("<p></p>").text(data.description);
        var price = $("<p></p>").text("Price: " + data.price);

        var img_url = $("<img>").attr("src", data.img_url).css({
            "width": "133px"
        });

        $(info).append(name);
        $(info).append(description);
        $(info).append(price);

        $(img).append(img_url);

        $(first).append(info);
        $(first).append(img);

        var main = $("#main").append(first).css({
            "display": "flex",
            "flex-direction": "column"
        });

    }

    var data_j = null;

    $.ajax({
        url: "scripts/config/config.json",
        dataType: 'json',
        // data: data,
        success: function(data) {
            data_j = data;
            for (let i = 0; i < data.length; i++) {
                creating(data[i]);
            }

        }
    });

    function readFile() {
        if (this.files && this.files[0]) {
            var FR = new FileReader();

            $(FR).on("load", function(e) {
                $.when(form_info.img_url = e.target.result).then($("input").prop('disabled', false));
            });

            FR.readAsDataURL(this.files[0]);
        }

    }

    $("#image").on("change", readFile);

    var form_info = {};

    $("#form").submit(function(e) {
        e.preventDefault();
        form_info.name = $("#name").val();
        form_info.price = $("#price").val();
        form_info.description = $("#desc").val();
        form_info.id = parseInt(data_j[data_j.length - 1].id) + 1;

        $.ajax({
            type: "POST",
            url: "/scripts/router.php",
            data: form_info,
            success: function() {
                creating(form_info);
                $("#form")[0].reset();
                form_info = {};
            },
            error: function() {
                $("#submit").val("Check your connection").css({
                    "background": "#ff5656",
                    "border-radius": "4px"
                });
            }
        });

    });

});