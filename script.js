function search(string, substring)
{
	return string.indexOf(substring);
}

function uppercaseLetters(string)
{
	var upamount = 0;
	for (var i = 0; i < string.length; i++)
	{
		if (string[i].toUpperCase() == string[i] && (string[i].match(/[a-z]/i) != null))
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
	var penalty = 0;
	var upLetters = uppercaseLetters(text);
	if (upLetters == 0)
	{
		penalty += 0.15; // No caps counts as immaturity
	}
	// Above code is for determining the amount of capitals + adding a penalty for no caps
	var exclaMarks = occur(text, "!");
	var questMarks = occur(text, "?");
	var badMarks = exclaMarks + questMarks;
	// Above code is for determining the amount of "bad" marks
	var maturityRatio = ((upLetters + badMarks) / text.length) - penalty; // The amount of "bad" characters per character - penalty deductions
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
	for (i=0;i<indexlist.length;i++)
	{
		if (search(lowtext, indexlist[i]) !== -1);{
			inindexlist = true;
		} // This will tell if any of the strings in indexlist exist in the stripped version of the string
	}
	var containsFNaF = indexFNaF !== -1 || indexFaNF !== -1;
	var relatedspam = inindexlist && containsFNaF;
	var immature = false;
	isspam = false
	if (maturity(text) < 90)
	{
		immature = true;
		if (relatedspam)
		{
			isspam = true;
		}
	}
	return isspam;
}
