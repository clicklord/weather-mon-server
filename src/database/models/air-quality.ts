import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import { LocationCityModel } from './location-city';

export interface AirQualityModel extends mongoose.Document {
  locationCity: LocationCityModel;
  epaIndex: number;
  epaState: string;
  mepIndex: number;
  mepState: string;
  createdAt: Date;
  updatedAt: Date;
}

const AirQualitySchema: mongoose.Schema = new mongoose.Schema({
  locationCity: { 
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'LocationCity',
    required: true
  },
  epaIndex: { type: Number },
  epaState: { type: String },
  mepIndex: { type: Number },
  mepState: { type: String },
},
{ 
  timestamps: true 
}
);

AirQualitySchema.plugin(mongoosePaginate);

export default mongoose.model<AirQualityModel>('AirQuality', AirQualitySchema);