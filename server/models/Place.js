const { Schema, model } = require("mongoose");

const schema = new Schema({
  business_status: {
    type: String,
  },
  formatted_address: {
    type: String,
  },
  geometry: {
    location: {
      lat: Number,
      lng: Number,
    },
    viewport: {
      northeast: {
        lat: Number,
        lng: Number,
      },
      southwest: {
        lat: Number,
        lng: Number,
      },
    },
  },
  icon: {
    type: String,
  },
  icon_background_color: {
    type: String,
  },
  icon_mask_base_uri: {
    type: String,
  },
  name: {
    type: String,
  },
  opening_hours: {
    open_now: Boolean,
  },
  photos: [
    {
      height: Number,
      html_attributions: [String],
      photo_reference: String,
      width: Number,
    },
  ],
  place_id: {
    type: String,
    required: true,
  },
  plus_code: {
    compound_code: String,
    global_code: String,
  },
  rating: {
    type: Number,
  },
  reference: {
    type: String,
  },
  types: [String],
  user_ratings_total: {
    type: Number,
  },
});

const Place = model("Place", schema);
module.exports = Place;
