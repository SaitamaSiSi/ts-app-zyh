import { requestClient } from '@/api/request';
import type { QrcodeApi}  from '@/api/type/QrCodeApi';

export async function GetQrcodeApi(data: QrcodeApi.QrcodeParams) {
  return requestClient.post<QrcodeApi.QrcodeResult>({url: '/qrCode/getQrcode'}, data);
}

export async function VertyQrcodenApi(data: QrcodeApi.QrcodeParams) {
    return requestClient.post<QrcodeApi.QrcodeResult>({url: '/qrCode/vertyQrcode'}, data);
  }


