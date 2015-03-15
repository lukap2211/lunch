var V = {
    api : {
        proxy   : "https://agile-ridge-2099.herokuapp.com/ba-simple-proxy.php?url=",
        me      : "https://api.venmo.com/v1/me?access_token=",
        friends : "https://api.venmo.com/v1/users/"
    },
    token       : "",
    user        : {},
    friends     : [],

    _fn : {
        getMe : function () {
            $.getJSON(V.api.proxy + V.api.me + V.token + "&callback=?", function(result) {
                console.log("getting user details...");
                if (result.contents.data) {
                    V.user = result.contents.data.user;
                    console.log(V.user);
                    V._fn.getFriends();
                } else {
                    console.log("NO USER! (probably token expired)");
                }
            });
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

                li_friend = [ "<li data-id='" + friend.id + "'>",
                              "<h3>" + friend.display_name + "</h3>",
                              "<img src='" + friend.profile_picture_url + "' title ='" + friend.display_name + "' />",
                              "</li>"
                            ].join("");
                friends_html.push(li_friend);

            });
            $("#my_friends").append(friends_html.join(""));
        },

        getParameterByName : function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    },

    init : function () {
        console.warn("venmo initalized!");
        if (V._fn.getParameterByName('access_token')) {
            V.token = V._fn.getParameterByName('access_token')
            V._fn.getMe();
        }
    }
};

$(document).ready(function () {
    L.init();
    V.init();
});