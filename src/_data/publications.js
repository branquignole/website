module.exports = async function () {
    const halId = "johanne-vincent";
    const url = `https://api.archives-ouvertes.fr/search/?q=authIdHal_s:${halId}&wt=json&fl=title_s,uri_s,producedDateY_i,authFullName_s,docType_s,doi_s,journalTitle_s&rows=21`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        console.log("✅ Résultat HAL :", data.response.numFound, "résultats trouvés");

        if (!data.response.docs || data.response.docs.length === 0) {
            console.warn("⚠️ Aucune publication trouvée pour", halId);
        }

        const publications = data.response.docs.map(pub => ({
            title: pub.title_s,
            year: pub.producedDateY_i,
            url: pub.uri_s,
            authors: pub.authFullName_s || [],
            type: pub.docType_s || "",
            doi: pub.doi_s || "",
            journal: pub.journalTitle_s || ""
        }));

        publications.sort((a, b) => (b.year || 0) - (a.year || 0));
        console.log("📚 Publications extraites :", publications.length);
        return publications;

    } catch (err) {
        console.error("❌ Erreur HAL:", err);
        return [];
    }
};
