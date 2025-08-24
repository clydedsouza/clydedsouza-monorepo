# Using GitHub’s GeoJSON for Your Mapping Requirements

How the Ministry of Health NZ displays covid locations of interest on their website

***

### Using GitHub’s GeoJSON for Your Mapping Requirements

#### How the Ministry of Health NZ displays covid locations of interest on their website

![An image of a multiple paper-based maps placed on a table.](https://cdn-images-1.medium.com/max/800/1*zMCziovdzOC5yDt63FIMSg.jpeg)

Image source: [Unsplash](https://unsplash.com/photos/AFB6S2kibuk)

[GeoJSON](https://geojson.org/) is an open standard geospatial data interchange format that represents simple geographic features and their non-spatial attributes based on [JavaScript Object Notation (JSON)](https://en.wikipedia.org/wiki/JSON). It uses a geographic coordinate reference system, [World Geodetic System 1984](https://en.wikipedia.org/wiki/World_Geodetic_System), and units of decimal degrees.

GitHub supports rendering GeoJSON files within GitHub repositories and in Gists. If you’d like to try out any of the snippets from this article by yourself, either create a file in your [GitHub](https://github.com/new) repository with the file extension `.geojson` (or `.topojson`) or create a [Gist](https://gist.new/) with the file extension `.geojson`. Once you commit (i.e. save) your changes, you should be able to preview the map right away. If you’d like to read the full specification of GeoJSON, you may find it [here](https://datatracker.ietf.org/doc/html/rfc7946).

### GeoJSON online tool

Before we get into the details of GeoJSON, I came across [this online tool](https://geojson.io/) which allows you to plot points and areas on a map and also see the generated GeoJSON file for it. Throughout the article, I’d highly recommend using this tool to learn about GeoJSON’s features.

As evident in the screenshot below, it not only allows you to plot a feature on a map but you can also configure the properties and metadata for the feature. Each feature has a set of distinct style properties that affect how the feature is displayed on the map. For example, a polygon area might have a fill colour but a point may not have the same.

![An image of the properties tab selected on a GeoJSON rendered map.](https://cdn-images-1.medium.com/max/800/1*7NcXrEpKJlbXeatp9PfG_g.png)

Clicking on the **Info** tab from the pop up will give you the area of the selected feature, which is pretty useful.

![An image of the info tab selected on a GeoJSON rendered map.](https://cdn-images-1.medium.com/max/800/1*CXsAfNnumvIbrBTxFJwELg.png)

### Features

#### Point

Plotting markers on the map is super easy. In the geometry block, just add the coordinates of where you’d want your marker to be. Coordinates are the latitude and longitude of the location.

The snippet above will produce a result like the following screenshot.

![An image of a marker on a GeoJSON rendered map.](https://cdn-images-1.medium.com/max/800/1*SaoWrfwUsmhnIdwJ_8v_YA.png)

You can use the properties block to specify some metadata for that marker. In the snippet below, the properties with the prefix `marker-` are Point specific. Depending on what type of feature you decide to plot on the map, you’ll have access to different built-in properties.

Adding the various properties for this point not only gives it a different style but also adds metadata that will be displayed when you click on the point.

![An image of a marker rendered on a GeoJSON rendered map.](https://cdn-images-1.medium.com/max/800/1*w6ZdnnTjfS6QzbeVvwYvtg.png)

#### Multiple points

If you’d like to display multiple points on a map, just duplicate the contents of the feature block and update the coordinates accordingly. The features block is an array of objects which means it can hold either a single feature or multiple features, in this case, either a single point or multiple points. The same logic applies to other features as well, which we’ll revisit later in this article.

The snippet above will produce the following result.

![An image of multiple points rendered on a GeoJSON rendered map.](https://cdn-images-1.medium.com/max/800/1*EKhFsrUk_BzKF_teH1NteA.png)

#### Line

For a line, you’ll need to supply two sets of coordinates and GitHub will connect them both forming a line. The properties in the snippet below are line specific.

The snippet above will produce the following output.

![An image of a line rendered on a GeoJSON rendered map.](https://cdn-images-1.medium.com/max/800/1*LtMKnDmWqpIjD1uc9bBV8A.png)

#### Rectangle

To plot a rectangle, you’ll need to supply four sets of coordinates. Note, that the geometry type is still `Polygon` because a rectangle is just like any other area except it has four sets of coordinates at right angles with parallel sides.

The above snippet produces the following result.

![An image of a rectangle rendered on a GeoJSON rendered map.](https://cdn-images-1.medium.com/max/800/1*DJmxKBBKaG89KYfbaZ7Wpw.png)

#### Polygon

For a polygon, the code snippet looks very similar to that of a rectangle. The rendered output just doesn’t have four sets of coordinates at right angles with parallel sides.

The snippet above produces the following output.

![An image of an polygon rendered on a GeoJSON rendered map.](https://cdn-images-1.medium.com/max/800/1*WCfesVthesBPjjgm0Z05Ag.png)

#### Rendering all features

You are not limited to rendering only a single type of feature. You can have a single GeoJSON file that has a combination of multiple points, lines, polygons and rectangles. The following snippet is an example of rendering different features.

This snippet produces the following output.

![An image of all objects rendered on a GeoJSON rendered map.](https://cdn-images-1.medium.com/max/800/1*lP0a1rbXFsNQacHB_lKv7A.png)

### Embedding the map on your website

GitHub allows you to embed the map directly on your webpage. To do so, you’ll need to copy the following snippet format into your website and replace the placeholders as required.

```
<script src="https://embed.github.com/view/geojson/<username>/<repo>/<ref>/<path_to_file>"></script>
```

So, if my GeoJSON file’s URL is `https://github.com/ClydeDz/geojson-demo/blob/main/allobjects-demo.geojson`, then the embedded script would be the following.

```
<script src="https://embed.github.com/view/geojson/ClydeDz/geojson-demo/main/allobjects-demo.geojson"></script>
```

You can also suffix `?height=300&width=500` at the end of the script URL to update the height and width of the rendered map on your website.

Here is a [JSFiddle](https://jsfiddle.net/e85hanz4/) to demonstrate embedding a GeoJSON map.

### Real use case

The Ministry of Health New Zealand is using GitHub’s GeoJSON file to show all of the locations of interest on their [website](https://www.health.govt.nz/covid-19-novel-coronavirus/covid-19-health-advice-public/covid-19-information-close-contacts/covid-19-contact-tracing-locations-interest/covid-19-contact-tracing-locations-interest-map). Any updates to the underlying GeoJSON file will reflect immediately on the next page load. The GitHub repository that contains this information is located [here](https://github.com/minhealthnz/nz-covid-data).

![An image of Ministry of Health NZ’s locations of interest rendered on a GeoJSON rendered map.](https://cdn-images-1.medium.com/max/800/1*cpVcQ0QQOy89lmuSS_t31A.png)

[Source](https://www.health.govt.nz/covid-19-novel-coronavirus/covid-19-health-advice-public/covid-19-information-close-contacts/covid-19-contact-tracing-locations-interest/covid-19-contact-tracing-locations-interest-map)

That’s it! Thanks for reading.

By [Clyde D'Souza](https://medium.com/@clydedz) on [February 21, 2022](https://medium.com/p/c6bacae5a8f6).

[Canonical link](https://medium.com/@clydedz/using-githubs-geojson-for-your-mapping-requirements-c6bacae5a8f6)

Exported from [Medium](https://medium.com) on August 22, 2025.
