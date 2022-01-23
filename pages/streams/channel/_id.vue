<template>
  <div style="background: black">
    <iframe
      :src="
        'https://player.twitch.tv/?volume=1.00&amp;channel=' +
        slug +
        '&parent=localhost&parent=gasome.com'
      "
      frameborder="0"
      allowfullscreen="true"
      scrolling="no"
      style="display: block; width: 100%; height: 33vh"
    ></iframe>
    <iframe
      :src="
        'https://www.twitch.tv/embed/' +
        slug +
        '/chat?darkpopout&parent=localhost&parent=gasome.com'
      "
      scrolling="yes"
      style="display: block; width: 100%; height: 67vh"
    >
    </iframe>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'blank',
  head: {
    meta: [
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      },
    ],
  },
  asyncData({ params }) {
    return {
      slug: params.id,
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
</style>
