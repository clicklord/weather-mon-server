import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

export interface LocationCityModel extends mongoose.Document {
  name: string;
  description: string;
  location: {
    type: string;
    coordinates: number[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const LocationCitySchema: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: [],
    },
  },
  {
    timestamps: true,
  },
);

LocationCitySchema.index({ location: '2dsphere' });
LocationCitySchema.plugin(mongoosePaginate);

export default mongoose.model<LocationCityModel>(
  'LocationCity',
  LocationCitySchema,
);
