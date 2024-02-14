const englishCities = [
    {
      "București" : "Bucharest",
      "Iași" : "Iasi",
      "Timișoara" : "Timisoara",
      "Brașov" : "Brasov",
      "Constanța" : "Constanta",
      "Galați" : "Galati",
    }
]

const AddressGeneratorUtil = (parsedCompanyAddress) => {
    const parts = parsedCompanyAddress.split(',');
    const cityName = parts.length > 1 ? parts[1].trim() : '';
    const searchCityName = englishCities[cityName] || cityName;
    const searchQuery = `${searchCityName}, Romania`;

    return searchQuery;
}

export default AddressGeneratorUtil;