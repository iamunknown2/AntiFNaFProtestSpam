function search(string, substring)
{
	return string.indexOf(substring);
}

function uppercaseLetters(string)
{
	var upamount = 0;
	for (var i = 0; i < string.length; i++)
	{
		if (string[i].toUpperCase() == string[i] && string[i].match(/[a-z]/i))
		{
			upamount += 1;
		}
	}
	return upamount;
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

function maturity(text)
{
	var upLetters = uppercaseLetters(text);
	// Above code is for determining the amount of capitals
	var exclaMarks = occur(text, "!");
	var questMarks = occur(text, "?");
	var badMarks = exclaMarks + questMarks;
	// Above code is for determining the amount of "bad" marks
	var maturityRatio = (upLetters + badMarks) / text.length; // The amount of "bad" characters per character
	var maturity = maturityRatio * 100; // The maturity rating is a percentage of the maturity ratio
	return maturity;
}

function spamtext(text)
{
	var lowtext = text.toLowerCase().replace(/ /g, ""); // Converts all to lowercase, then removes all spaces
	var indexlist = ["ban", "takedown", "takesdown", "fightfor"];
	var indexFNaF = search(lowtext, "fnaf");
	var indexFaNF = search(lowtext, "fanf");
	var inindexlist = false;
	for (i in indexlist)
	{
		isinindexlist = isinindexlist || (search(lowtext, indexlist[i]) !== -1); // This will tell if any of the strings in indexlist exist in the stripped version of the string
	}
	var containsFNaF = indexFNaF !== -1 || indexFaNF !== -1;
	var relatedspam = isindexlist && containsFNaF;
}
