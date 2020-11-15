

<?php 
	require '../vendor/autoload.php';
 
	use Parse\ParseClient;
	use Parse\ParseException;
	use Parse\ParseQuery;

$urlSegs = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/'));

	if (isset($_GET['v'])) {
		ParseClient::initialize('TLEOYqL4I2QgTX0GpEzg3oD1Xv6Q3s2MiVSAEcri', 'bBZdCUKkAol8wuNJoX6rEYcYayMytmnoq5g8HycN', 'VqRv8wcSjOPDkX6Qhytc4A3vBIoRXs5xmQi2ruCj');
		$viewVar = $_GET['v'];
		$query = new ParseQuery("Preview");

		try {
			// The object was retrieved successfully.
			$imageUrl = $query->get($viewVar)->get('file')->getUrl();
		} catch (ParseException $ex) {
		  	// The object was not retrieved successfully.
		  	// error is a ParseException with an error code and message.
		}
	}
?>

<?php if (isset($viewVar)) { ?>
<!doctype html>
<html lang="en" ng-app="myApp">
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/light.css"/>
	<title>Make a JPG</title>
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
	<link rel="icon" href="/favicon.ico" type="image/x-icon">
	<meta name="application-name" content="Make a JPG">
	<meta name="description" content="Make a JPG is a free tool for creating images and photos that can be saved as JPG or PNG file formats.">
	<meta name="keywords" content="photos, images, jpg, png, make">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
	<h1 id="logo"><a href="/">Make a JPG</a></h1> 
	<nav id="nav"><?php /* <a href="http://mjpg.co/<?php echo $viewVar; ?>">mjpg.co/<?php echo $viewVar; ?></a> |  */ ?><a href="/">New</a></nav>

	<div id="jpg_viewer">
		<?php if (isset($imageUrl)) { ?>
			<img src="<?php echo $imageUrl; ?>" alt="Make a JPG" title="Make a JPG" />
		<?php } else { ?>
			<p id="not_found">Dang nabbit! That image is gone!</p>
		<?php } ?>
	</div>

	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-53587857-1', 'auto');
	  ga('send', 'pageview');
	</script>
</body>
</html>

<? } else { ?>
<!doctype html>
<html lang="en" ng-app="myApp">
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/main.css"/>
	<title>Make a JPG</title>
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
	<link rel="icon" href="/favicon.ico" type="image/x-icon">
	<meta name="application-name" content="Make a JPG">
	<meta name="description" content="Make a JPG is a free tool for creating images and photos that can be saved as JPG or PNG file formats.">
	<meta name="keywords" content="photos, images, jpg, png, make">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body jpg-dropzone>
	<div id="view" ng-view></div>

	<em id="footer">By using this application, you agree to the <a href="/#/terms">Terms of Use</a></em>

	<script src="//www.parsecdn.com/js/parse-1.2.18.min.js"></script>
	<script src="lib/angular/angular.min.js"></script>
	<script src="lib/angular/angular-route.min.js"></script>
	<script src="lib/modernizr/modernizr.js"></script>
	<script src="js/main.js"></script>
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-53587857-1', 'auto');
	  ga('send', 'pageview');

	  (function() {
	  	if (Modernizr.touch) {
	  		var s = '<div id="unsupported_browser"><div class="container"><h1>Make a JPG</h1><a href="">Dismiss</a><div class="message"><h2>Unsupported Browser</h2> Sorry, we don\'t support touch devices yet. Try Internet Explorer 9 and above, Firefox, Chrome, or Safari.</div></div></div>';
	  		var div = document.createElement('div');
			div.innerHTML = s;
			var element = div.firstChild;

			document.body.appendChild(element);

			element.onclick = function(e) {
				document.getElementById('unsupported_browser').style.display = 'none';
				e.preventDefault();
				return false;
			}
	  	}
	  })();
	</script>
</body>
</html>
<?php } ?>