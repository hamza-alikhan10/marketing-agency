import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

const DepositForm = () => {
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { toast } = useToast();
  const { updateUser } = useAuth();

  const USDT_TRC20_ADDRESS = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (parseFloat(value) >= 10 && parseFloat(value) <= 1500)) {
      setAmount(value);
      setShowQR(value !== '' && parseFloat(value) >= 10);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(USDT_TRC20_ADDRESS);
    toast({
      title: 'Address Copied',
      description: 'USDT TRC20 address copied to clipboard',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !txHash) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill in all required fields',
      });
      return;
    }

    const depositAmount = parseFloat(amount);
    if (depositAmount < 10 || depositAmount > 1500) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Deposit amount must be between $10 and $1500',
      });
      return;
    }

    if (txHash.length !== 64) {
      toast({
        variant: 'destructive',
        title: 'Invalid Transaction Hash',
        description: 'Please provide a valid TRON transaction hash',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await apiService.createDeposit(depositAmount, txHash);
      
      toast({
        title: 'Deposit Submitted',
        description: 'Your deposit is being processed. It will be confirmed shortly.',
      });

      // Reset form
      setAmount('');
      setTxHash('');
      setShowQR(false);
      
      // Update user data
      await updateUser();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Deposit Failed',
        description: error.message || 'Failed to process deposit',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Deposit USDT
        </CardTitle>
        <CardDescription>
          Deposit USDT (TRC20) to start earning daily yields
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (USDT)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount ($10 - $1500)"
              value={amount}
              onChange={handleAmountChange}
              min="10"
              max="1500"
              step="0.01"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minimum: $10 | Maximum: $1500
            </p>
          </div>

          {showQR && (
            <div className="space-y-4">
              <div className="text-center">
                <Badge variant="outline" className="mb-4">
                  Send exactly {amount} USDT to this address
                </Badge>
                
                <div className="bg-white p-4 rounded-lg inline-block">
                  <QRCodeSVG 
                    value={USDT_TRC20_ADDRESS} 
                    size={160}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
              </div>

              <div>
                <Label>USDT TRC20 Address</Label>
                <div className="flex gap-2">
                  <Input
                    value={USDT_TRC20_ADDRESS}
                    readOnly
                    className="font-mono text-xs"
                  />
                  <Button
                    type="button"
                    onClick={copyAddress}
                    size="sm"
                    variant="outline"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="txHash">Transaction Hash</Label>
                <Input
                  id="txHash"
                  placeholder="Enter TRON transaction hash"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Paste the transaction hash after sending USDT
                </p>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={!showQR || !txHash || isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Deposit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DepositForm;