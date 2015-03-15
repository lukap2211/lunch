var V = {
    api : {
        proxy   : "https://agile-ridge-2099.herokuapp.com/ba-simple-proxy.php?url=",
        me      : "https://api.venmo.com/v1/me?access_token=",
        friends : "https://api.venmo.com/v1/users/"
    },
    token       : "",
    user        : {},
    balance     : "",
    friends     : [],
    step        : 1,
    min_steps   : 1,
    max_steps   : 5,

    _fn : {

        util : {
            nav : {
                next : function() {
                    if (V.step < V.max_steps) V.step++;
                    V._fn.util.nav.setSteps();
                },

                back : function () {
                    if (V.step > V.min_steps) V.step--;
                    V._fn.util.nav.setSteps();
                },

                setSteps : function () {
                    $(".venmo .step").hide();
                    $(".venmo .step.s" + V.step).show();
                    V._fn.util.nav.setProgress();
                },

                setProgress :function () {
                    var progress = parseFloat((V.step)/V.max_steps*100) + "%";
                    $(".progress .progress-bar").html(progress).css("width", progress);
                }
            },

            bindings : function () {
                $(".venmo .navigation .next").on("click", function() {
                    V._fn.util.nav.next()
                });

                $(".venmo .navigation .back").on("click", function() {
                    V._fn.util.nav.back()
                });

                $(".venmo .s1 li label").on("click", function(i) {
                    $("input[type=checkbox]:checked").length === 0 ? $("#my_details .badge").html("") : $("#my_details .badge").html($("input[type=checkbox]:checked").length);
                    $(this).parent("li").addClass("selected");
                });
            }
        },

        getMyDetails : function () {
            $.getJSON(V.api.proxy + V.api.me + V.token + "&callback=?", function(result) {
                console.log("getting user details...");
                if (result.contents.data) {
                    V.user = result.contents.data.user;
                    V.balance = result.contents.data.balance;
                    console.log(V.user);
                    V._fn.showMyDetails();
                    V._fn.getFriends();
                } else {
                    console.log("NO USER! (probably token expired)");
                }
            });
        },

        showMyDetails : function () {
            var my_details = [ "<h3 class='title'>" + V.user.display_name + " <br /><small>$" + V.balance + " </small></h3>",
                               "<img src='" + V.user.profile_picture_url + "' title ='" + V.user.display_name + "' class='img-circle' align='left' />",
                               "<span class='badge'></span>",
                               ].join("");

            $("#my_details").append(my_details);
        },

        getFriends : function () {
            $.getJSON(V.api.proxy + V.api.friends + V.user.id + "/friends?access_token=" + V.token + "&callback=?", function(result) {
                console.log("getting friends...");
                V.friends = result.contents.data;
                V.friends.push(V.user); // adding user to friends
                console.log(V.friends);
                V._fn.showFriends();
            });
        },

        showFriends : function () {
            var friends_html = [];
            $.each(V.friends, function (i, friend) {

                my_friend = [ "<li class=''>",
                              "<label>",
                              "<img src='" + friend.profile_picture_url + "' title ='" + friend.display_name + "' class='img-circle' align='left' />",
                              "<div class='input-group'>",
                              "<span class='input-group-addon check'>",
                              "<input type='checkbox' aria-label='...'' name='" + friend.display_name + "' value='" + friend.id + "'>",
                              "<div class='selected'><span class='glyphicon glyphicon-ok-sign' aria-hidden='true'></span></div>",
                              "</span>",
                              "<div class='title'>" + friend.first_name + "</div >",
                              "</div>",
                              "</label>",
                              // "<div class='amount input-group'>",
                              // "<div class='input-group-addon'>$</div>",
                              // "<input type='number' step='1' min='0' max='99' pattern='[0-9]*' class='form-control dollar' id='exampleInputAmount' placeholder='$'>",
                              // "<div class='input-group-addon'>.</div>",
                              // "<input type='number' step='1' min='0' max='99' pattern='[0-9]*' class='form-control cent' id='exampleInputAmount' placeholder='¢'>",
                              // "<div class='input-group-addon'><span class='addAmount glyphicon glyphicon-plus' aria-hidden='true'></span></div>",
                              // "</div>",
                              "</li>"
                            ].join("");
                friends_html.push(my_friend);

            });
            $("#my_friends").append(friends_html.join(""));
        },

        getParameterByName : function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        getLocalData : function () {
            V.user    = LOCAL.user;
            V.balance = LOCAL.balance;
            V.friends = LOCAL.friends;
            V._fn.showMyDetails();
            V._fn.showFriends();
        }
    },

    init : function () {

        V._fn.util.nav.setProgress()

        console.warn("venmo initalized!");
        if (V._fn.getParameterByName('access_token')) {
            V.token = V._fn.getParameterByName('access_token')
            V._fn.getMyDetails();
            V._fn.util.bindings();

        } else {
            // use local stored data not to exceed request limit
            V._fn.getLocalData();
            V._fn.util.bindings();

        }
    }
};

$(document).ready(function () {
    L.init();
    V.init();
});