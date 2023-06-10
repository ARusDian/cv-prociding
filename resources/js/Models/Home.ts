export interface IHomeHeader {
  id: number,
  background_image_path: string,
  logo_path: string,
  date_stamp: string,
  title: string,
  subtitle: string,
}

export interface IHomeHeaderForm extends IHomeHeader {
  input_logo_path: File | string,
  input_background_image: File | string,
}

export interface IHomeNews {
  id: number,
  image: string,
  title: string,
  content: string,
  is_active: boolean,
  link_to: string,
}

export interface IHomeNewsForm  {
  title: string,
  content: string,
  img: File | string,
  linkTo: string,
}

export interface IHomeKeynote {
  id: number,
  img_path: string,
  name: string,
  title: string,
  affiliation: string,
  rank: number
}

export interface IHomeKeynoteForm extends IHomeKeynote {
  input_img: File | string,
}

export interface IHomeGallery {
  id: number,
  img_path: string,
}
export interface IHomeTimeline {
  id: number,
  img_path: string,
}

export interface IHomePublication {
  id: number,
  cover_img_path: string,
  link_to: string,
}

export interface IHomePublicationForm {
  img: File | string,
  linkTo: string,
}

export interface IHomeSupport {
  id: number,
  img_path: string,
}

