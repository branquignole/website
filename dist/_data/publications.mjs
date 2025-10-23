import fetch from "node-fetch";

export default async function () {
    const halId = "johanne-vincent";
    const url = `https://api.archives-ouvertes.fr/search/?q=authIdHal_s:${halId}&wt=json&fl=title_s,uri_s,producedDateY_i`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const publications = data.response.docs.map(pub => ({
            title: pub.title_s,
            year: pub.producedDateY_i,
            url: pub.uri_s
        }));

        return publications;
    } catch (err) {
        console.error("Erreur lors de la récupération des publications HAL:", err);
        return [];
    }
}
