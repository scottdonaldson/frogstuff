<?php
$class = 'rsvp';
include('includes/header.php'); ?>

<div id="loading"></div>

	<div class="save-the-date-content">

		<div class="gradient-bg"></div>

		<img class="has-key lazy-load" src="<?= $url; ?>/img/address-header.png">
		<img class="no-key lazy-load" src="<?= $url; ?>/img/savethedate.png">

		<div id="container">

			<form id="check-name">
				<input id="your-name" name="your-name" style="color: black;">
				<input type="submit" id="submit" value="Ok, let's go!">
			</form>
		</div>

		<div id="save-the-date-copyright" class="twocolumn footer">
			<h5>All photos by <a href="http://uniquelapin.com" target="_blank">Unique Lapin</a>.</h5>
		</div>

	</div>

	<div class="save-the-date-fallback">
		<div class="gradient-bg"></div>
		<img src="<?= $url; ?>/img/savethedate.png">
		<p>This website uses JavaScript so that you can send us your address. But it looks like you don't have JavaScript enabled.</p>
		<p>It's a little weird, but that's OK! (It's not like it's what we do for a living or anything...)</p>
		<p>You can still send us your address over email at <a href="mailto:scott.p.donaldson@gmail.com">scott.p.donaldson@gmail.com</a>.</p>
		<br>
		<h5>All photos by <a href="http://uniquelapin.com" target="_blank">Unique Lapin</a>.</h5>
	</div>

<?php include('includes/footer.php'); ?>
