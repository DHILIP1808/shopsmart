import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { applyPromoCode, removePromoCode } from '../cartSlice';
import { selectCartSummary, selectCartItemCount } from '../cartSelectors';
import { showToast } from '../../../features/ui/uiSlice';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card, CardBody } from '../../../components/ui/Card';
import { formatPrice } from '../../../utils/formatters';
import { PROMO_CODES, TAX_RATE, FREE_SHIPPING_THRESHOLD } from '../../../utils/constants';

export const CartSummary: React.FC = () => {
  const dispatch = useAppDispatch();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const cartSummary = useAppSelector(selectCartSummary);
  const itemCount = useAppSelector(selectCartItemCount);
  const promoCode = useAppSelector((state) => state.cart.promoCode);
  const discount = useAppSelector((state) => state.cart.discount);

  const handleApplyPromo = () => {
    const code = promoInput.toUpperCase();
    if (PROMO_CODES[code]) {
      dispatch(applyPromoCode(code));
      dispatch(
        showToast({
          message: `Promo code "${code}" applied! ${PROMO_CODES[code]}% off`,
          type: 'success',
        })
      );
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      dispatch(
        showToast({
          message: 'Invalid promo code',
          type: 'error',
        })
      );
    }
  };

  const handleRemovePromo = () => {
    dispatch(removePromoCode());
    dispatch(
      showToast({
        message: 'Promo code removed',
        type: 'info',
      })
    );
  };

  return (
    <Card className="sticky top-24">
      <CardBody className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Order Summary
        </h2>

        {/* Promo Code */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Promo Code
          </label>
          {promoCode ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-green-600 dark:text-green-400" size={20} />
                <span className="font-medium text-green-700 dark:text-green-300">
                  {promoCode} ({discount}% off)
                </span>
              </div>
              <button
                onClick={handleRemovePromo}
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                <IoCloseCircle size={20} />
              </button>
            </motion.div>
          ) : (
            <div className="flex gap-2">
              <Input
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value);
                  setPromoError('');
                }}
                placeholder="Enter code"
                error={promoError}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
              />
              <Button onClick={handleApplyPromo} disabled={!promoInput.trim()}>
                Apply
              </Button>
            </div>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Try: SAVE10, SAVE20, WELCOME15, NEWYEAR25
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal ({itemCount} items)</span>
            <span>{formatPrice(cartSummary.subtotal)}</span>
          </div>

          {cartSummary.discount > 0 && (
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <span>Discount</span>
              <span>-{formatPrice(cartSummary.discount)}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
            <span>{formatPrice(cartSummary.tax)}</span>
          </div>

          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Shipping</span>
            {cartSummary.shipping === 0 ? (
              <span className="text-green-600 dark:text-green-400 font-medium">
                FREE
              </span>
            ) : (
              <span>{formatPrice(cartSummary.shipping)}</span>
            )}
          </div>

          {cartSummary.subtotal < FREE_SHIPPING_THRESHOLD && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Add {formatPrice(FREE_SHIPPING_THRESHOLD - cartSummary.subtotal)} more for free
              shipping
            </p>
          )}
        </div>

        {/* Total */}
        <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Total
            </span>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {formatPrice(cartSummary.total)}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          size="lg"
          fullWidth
          onClick={() =>
            dispatch(
              showToast({
                message: 'Checkout coming soon!',
                type: 'info',
              })
            )
          }
        >
          Proceed to Checkout
        </Button>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>🔒</span>
          <span>Secure Checkout</span>
        </div>
      </CardBody>
    </Card>
  );
};