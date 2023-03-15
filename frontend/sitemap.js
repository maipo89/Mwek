const { create, fragment } = require('xmlbuilder2');
const fs = require('fs');
const fetch = require('node-fetch');
const axios = require('axios');
const root = create().ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });


var rootUrl = 'https://mwek.com'

var pageArray = [];

// const response = await this.$axios.get('https://api.mwek.com/api/pages');
// const pages = response.data.pages;
// console.log(pages)

async function fetchData() {

    // main pages
    const page = await fetch('https://api.mwek.com/api/pages').then((res) => {
        return res.json();
    });
    var pageArray = page.data;
    pageArray.forEach(url => {
        root.ele('url')
          .ele('loc').txt(rootUrl + '/' + url.attributes.slug).up()
        .up()
        .doc();
    });

    // service pages
    const services = await fetch('https://api.mwek.com/api/services').then((res) => {
        return res.json();
    });
    var servicesArray = services.data;
    servicesArray.forEach(url => {
        root.ele('url')
          .ele('loc').txt(rootUrl + '/' + url.attributes.departments + '/' + url.attributes.slug).up()
        .up()
        .doc();
    });

    // blog individual pages
    const blogs = await fetch('https://api.mwek.com/api/blogs?populate=deep,3').then((res) => {
        return res.json();
    });
    var blogArray = blogs.data;
    blogArray.forEach(url => {
        root.ele('url')
          .ele('loc').txt(rootUrl + '/blog/' + url.attributes.PrimaryCat.data.attributes.slug + '/' + url.attributes.slug).up()
        .up()
        .doc();
    });


    const xmlString = root.end({ prettyPrint: true });

    // fs.writeFileSync('sitemap.xml', xmlString);
    fs.writeFileSync('static/sitemap.xml', xmlString);

}
fetchData();





// const doc = create({ version: '1.0' })
//   .ele('root', { att: 'val' })
//     .ele('foo')
//       .ele('bar').txt('foobar').up()
//     .up()
//     .ele('baz')
//     .doc();

// urls.forEach(url => {
//     // console.log(url.loc)
//     // const urlElement = root.ele('url');
//     root.ele('root', { att: 'val' })
//     .ele('foo')
//       .ele('bar').txt('foobar').up()
//     .up()
//     .ele('baz')
//     .doc();
// });



