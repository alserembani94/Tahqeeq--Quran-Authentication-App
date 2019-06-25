export default FetchChapters = async() => {
    const response = await fetch('https://mighty-depths-66221.herokuapp.com/qas/verse/chapter/' + chapter);
    const body = await response.json();
    if (response.status !== 200) {
        throw Error(body.message) 
    }
    return body;
}