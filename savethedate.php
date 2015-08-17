<?php
$class = 'save-the-date';
include('includes/header.php'); ?>

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

		<img class="has-key" src="<?= $url; ?>/img/savethedate.png">
		<img class="no-key" src="<?= $url; ?>/img/savethedate.png">

		<div id="greetings-container" class="" style="display: none;">
			<div id="greetings"></div>
			<form>
				<textarea id="address"></textarea>
				<input type="submit" id="submit">

				<input type="hidden" id="column">
				<input type="hidden" id="row">
			</form>

			<div id="thanks" style="display: none;">
				<p>Thanks! Look for an invite in the next few months. We'll have more information on the website then.</p>
				<h2>Anxious to book your hotel now?</h2>
				<p>We've reserved a block of rooms at the <a href="http://www.morrisonclark.com">Morrison Clark Hotel</a>. It's a 6 minute walk to the venue and a 7 minute walk to the Metro. Just mention you’re booking as part of Lisa &amp; Scott’s wedding block.</p>
			</div>

			<div id="no-address" style="display: none;">
				<p>Psst! Put your address in the box above.</p>
			</div>
		</div>

	</div>



<?php include('includes/footer.php'); ?>
