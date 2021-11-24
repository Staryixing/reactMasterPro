import { Dispacth } from 'redux';
import { RouteComponentProps, match } from 'react-router-dom';

interface CommonType extends RouteComponentProps{
  dispatch: Dispacth,
  match: match<{
    id: string,
    mapCode: string
    sn: string,
  }>,
  location: state<{
    mapCode: string,
    id: string,
  }>
}
interface  selectDeviceType {
  id: string,
  text: string,
  version?: number,
  type: string,
  name: string,
}

interface optionType{
  label: string,
  value: string,
  key?: string,
}
interface searchType{
  pageNum: number,
  pageSize: number
}

interface selectOptionType {
  id: number,
  text: string,
  name?: string
}
interface siteParamsType {
  companyId: number
}

interface companySelectType {
  id: number,
  name: string
}
interface siteSelectType {
  id: number,
  name: string
}

export { CommonType,selectDeviceType,optionType,searchType,selectOptionType,siteParamsType,companySelectType,siteSelectType }
