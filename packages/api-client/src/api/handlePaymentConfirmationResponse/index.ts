import axios from 'axios';
import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import getAuthorizationHeaders from '../authentication/getAuthorizationHeaders';
import { Logger } from '@vue-storefront/core';

export default async function handlePaymentConfirmationResponse({ client, config }: ApiContext, { confirmationResponse }) {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config });
    const endpoint = config.backendUrl.concat('/api/v2/storefront/intents/handle_response');
    const response = await axios.post(
      endpoint,
      { response: confirmationResponse },
      {
        headers: getAuthorizationHeaders(token)
      }
    );

    return response.data;
  } catch (e) {
    Logger.error(e);
    throw e;
  }
}
