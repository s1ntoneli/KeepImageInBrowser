var currentUser;
$(document).ready(function() {
	new LeanCloudStorage().initStorage();
	$('#inputSubmit').click(function() {
		var username = $('#inputUsername').val();
		var password = $('#inputPassword').val();
		var email = $('inputEmail').val();

		var user = new AV.User();
		user.setUsername(username);
		user.setPassword(password);
		user.setEmail(email);
		user.signUp().then(function (loginedUser) {
			console.log("success");
			currentUser = loginedUser;
			window.location.href = './login.html';
		}, (function (error) {
		  alert(JSON.stringify(error));
		}));
	});
});