<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>SoundCloud App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
	<div id="wrapper">
		dkk

	</div>
<script src="http://connect.soundcloud.com/sdk.js"></script>
<script>
// initialize client with app credentials
SC.initialize({
  client_id: 'b54c0f76b20be90e6d13e95a590c7413',
  redirect_uri: 'http://dev.soundcloudapp.com:8888/'
});

// initiate auth popup
SC.connect(function() {
  SC.get('/me', function(me) { 
    alert('Hello, ' + me.followers_count); 
  });
});
</script>
</body>
</html>