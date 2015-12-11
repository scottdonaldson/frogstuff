<?php
$class = 'rsvp';
include('includes/header.php'); ?>

<div id="loading"></div>

<div id="container" style="height: 100%;">

	<div id="content-container" class="vcenter clearfix">
		<form id="check-name" style="display: none;">
			<h2>Hi! We're glad you've decided to RSVP and (hopefully!) celebrate our wedding with us.</h2>
			<p>Enter your name below and let's get started:</p>
			<input id="your-name" name="your-name" type="text">
			<input type="submit" id="submit" value="Ok, let's go!">
		</form>
	</div>

</div>

<div id="copyright">
	<h5>All photos by <a href="http://uniquelapin.com" target="_blank">Unique Lapin</a>.</h5>
</div>

<?php include('includes/footer.php'); ?>
