<?php
$class = 'save-the-date';
include('includes/header.php'); ?>

<div id="loading"></div>

	<script>
	function buildURL() {
		var key1 = '1aS5R3rKitHu2WBDJvj66',
	        key2 = 'UGRg2MgKwyjlowYZPAerUas';
		return 'https://spreadsheets.google.com/feeds/cells/' + key1 + key2 + '/1/public/basic?alt=json';
	}
	function gup( name ) {
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec( location.href );
		return results == null ? null : results[1];
	}
	</script>

	<div class="save-the-date-content">

		<div class="gradient-bg"></div>

		<img class="has-key lazy-load" src="<?= $url; ?>/img/address-header.png">
		<img class="no-key lazy-load" src="<?= $url; ?>/img/savethedate.png">

		<div id="greetings-container">
			<div id="greetings"></div>
			<form>
				<textarea id="address"></textarea>
				<div id="no-address" style="display: none;">
					<p>Psst! Put your address in the box above.</p>
				</div>
				<input type="submit" id="submit" value="Ok, let's go!">

				<input type="hidden" id="column">
				<input type="hidden" id="row">
			</form>

			<div id="thanks" style="display: none;">
				<h2 class="thanks-header">Thanks! Look for an invite in the next few months. We'll have more information on the website then.</h2>
				<h2>Anxious to book your hotel now?</h2>
				<p>We've reserved a block of rooms at the <a href="http://www.morrisonclark.com">Morrison Clark Inn</a>. It's a 6 minute walk to the venue and a 7 minute walk to the Metro. Just mention you’re booking as part of Lisa &amp; Scott’s wedding block.</p>
			</div>
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
