function search(string, substring)
{
	return string.indexOf(substring);
}

function wotsize(string)
{
	if (occur(string, "\n") !== 0)
	{
		return string.length / occur(string, "\n");
	}
	else
	{
		return 0;
	}
}

function badCases(string)
{
	var puncList = [".", "!", "?", "'", "\"", ":", ";"];
	var necPuncList = [".", "!", "?"]; // You MUST put a capital after these punctuation marks.
	var badUpAmount = 0;
	var badLowAmount = 0;
	for (var i = 1; i < string.length; i++) // Starting at item 1, since proper punctuation is good.
	{
		var character = string[i];
		var upException = puncList.indexOf(string[i - 1]) !== -1;
		var upNecessity = necPuncList.indexOf(string[i - 1]) !== -1;
		if (character.toUpperCase() == character && character.match(/^[A-z]+$/) && !upException) // Exempts proper use of capitalization
		{
			badUpAmount += 1;
		}
		else if (character.toLowerCase() == character && character.match(/^[A-z]+$/) && upNecessity)
		{
			badLowAmount += 1;
		}
	}
	return badUpAmount + badLowAmount;
}

function occur(string, character)
{
	var charamount = 0;
	for (var i = 0; i < string.length; i++)
	{
		if (string[i] == character)
		{
			charamount += 1;
		}	
	}
	return charamount;
}

function isNoRepeat(character)
{
	return character == "!" || character == "?";
}

function repeatPunc(string)
{
	var streak = 0;
	var repeatPenalty = 0;
	for (var i = 1; i < string.length; i++)
	{
		if (isNoRepeat(string[i]) && isNoRepeat(string[i - 1]))
		{
			streak += 1;
			repeatPenalty += streak;
		}
		else
		{
			streak = 0;
		}
	}
	return repeatPenalty;
}

function maturity(text)
{
	var penalty = 0;
	var strippedText = text.toLowerCase().replace(" ", ""); // Converts all to lowercase, then removes all spaces
	var semiStrippedText = text.replace(" ", "");
	var badCase = badCases(semiStrippedText);
	// Above code is for determining the amount of unnecessary capitals and neglected but necessary capitals
	var badPunc = repeatPunc(semiStrippedText);
	// Above code is for determining the amount of "bad" marks
	if (wotsize(text) > 400)
	{
		penalty += 0.2; // More than 400 characters/paragraph is too much
	}
	// Above code is for adding penalty for wall of text
	var indexlist = ["ban", "takedown", "takesdown", "fightfor", "ihate"];
	for (var i = 0; i < indexlist.length; i++)
	{
		{
			if (search(strippedText, indexlist[i]) !== -1)
			{
				penalty += 0.05;
			}
		}
	}
	// Above code is for adding penalties for phrases
	var maturityRatio = 1 - ((badCase + badPunc) / text.length) - penalty; // The amount of "bad" characters per character - penalty deductions
	var maturity = maturityRatio * 100; // The maturity rating is a percentage of the maturity ratio
	if (maturity < 0)
	{
		maturity = 0;
	}
	return Math.round(maturity);
}

function html_maturity()
{
	var text = document.getElementById("text").value;
	var score = document.getElementById("score");
	score.innerHTML = maturity(text).toString() + "%";
}

function spamtext(text)
{
	var strippedText = text.toLowerCase().replace(/ /g, ""); // Converts all to lowercase, then removes all spaces
	var indexFNaF = search(strippedText, "fnaf"); // Detect if the phrase "fnaf" is inside
	var inindexlist = false;
	var containsFNaF = indexFNaF !== -1;
	var mature = maturity(text) >= 85;
	var isspam = !clear && containsFNaF;
	return isspam;
}
