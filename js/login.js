var currentUser;
$(document).ready(function() {
	new LeanCloudStorage().initStorage();
	$('#submit').click(function() {
		var username = $('#username').val();
		var password = $('#password').val();

		var user = new AV.User();
		user.setUsername(username);
		user.setPassword(password);
		AV.User.logIn(username, password).then(function (loginedUser) {
			console.log("success");
			currentUser = loginedUser;
			window.location.href = './popup.html';
  		}, function (error) {
    		alert(JSON.stringify(error));
  		});
	});
});