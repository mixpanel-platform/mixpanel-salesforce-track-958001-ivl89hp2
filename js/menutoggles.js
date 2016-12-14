// Set click listeners for menu items to hide/display content
var adoptionTab = document.getElementById('app-adoption');
var adoptionTabStyle = adoptionTab.classList;
var adoptionContent = document.getElementsByClassName('mp-app-adoption');

var leaderboardTab = document.getElementById('user-leaderboard');
var leaderboardTabStyle = leaderboardTab.classList;
var leaderboardContent = document.getElementsByClassName('mp-user-leaderboard')[0];

var usageTab = document.getElementById('usage');
var usageTabStyle = usageTab.classList;
var usageContent = document.getElementsByClassName('mp-usage-last-30-days')[0];

var selectedCSS = 'mp-selected-menu-item';

function hideAllContent() {
	$('.mp-menu').addClass('hidden');

	for (var i = 0; i < adoptionContent.length; i++) {
		var adoptionElement = adoptionContent[i];
		adoptionElement.classList.add('hidden');
	}
	leaderboardContent.classList.add('hidden');
	usageContent.classList.add('hidden');
}

function showAdoptionTab() {
  adoptionTabStyle.add(selectedCSS);
  leaderboardTabStyle.remove(selectedCSS);
  usageTabStyle.remove(selectedCSS);

  for (var i = 0; i < adoptionContent.length; i++) {
    var adoptionElement = adoptionContent[i];
    adoptionElement.classList.remove('hidden');
  }

  leaderboardContent.classList.add('hidden');
  usageContent.classList.add('hidden');
}

function showLeaderboardTab() {
  adoptionTabStyle.remove(selectedCSS);
  leaderboardTabStyle.add(selectedCSS);
  usageTabStyle.remove(selectedCSS);

  for (var i = 0; i < adoptionContent.length; i++) {
    var adoptionElement = adoptionContent[i];
    adoptionElement.classList.add('hidden');
  }

  leaderboardContent.classList.remove('hidden');
  usageContent.classList.add('hidden');
}

function showUsageTab() {
  adoptionTabStyle.remove(selectedCSS);
  leaderboardTabStyle.remove(selectedCSS);
  usageTabStyle.add(selectedCSS);

  for (var i = 0; i < adoptionContent.length; i++) {
    var adoptionElement = adoptionContent[i];
    adoptionElement.classList.add('hidden');
  }

  leaderboardContent.classList.add('hidden');
  usageContent.classList.remove('hidden');
}

adoptionTab.addEventListener('click', showAdoptionTab);
leaderboardTab.addEventListener('click', showLeaderboardTab);
usageTab.addEventListener('click', showUsageTab);
