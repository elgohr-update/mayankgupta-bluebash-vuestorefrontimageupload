import { Address, ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { serializeAddress } from '../serializers/address';

export default async function saveCheckoutShippingAddress({ client, config }: ApiContext, { shippingAddress }: { shippingAddress: Address }) {
  const token = await getCurrentBearerOrCartToken({ client, config });
  const currency = await config.internationalization.getCurrency();
  const result = await client.checkout.orderUpdate(token, {
    order: { ship_address_attributes: serializeAddress(shippingAddress) },
    currency
  });

  if (result.isFail()) {
    throw result.fail();
  }
}
