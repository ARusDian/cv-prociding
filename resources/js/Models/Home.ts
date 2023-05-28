export interface IHomeHeader {
  id: number,
  logo_path: string,
  date_stamp: string,
  title: string,
  subtitle: string,
}

export interface IHomeHeaderForm extends IHomeHeader {
  input_logo_path: File | string,
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
export interface IHomePoster {
  id: number,
  img_path: string,
}

export interface IHomePublication {
  id: number,
  cover_img_path: string,
  link_to: string,
}

export interface IHomeSupport {
  id: number,
  img_path: string,
}

