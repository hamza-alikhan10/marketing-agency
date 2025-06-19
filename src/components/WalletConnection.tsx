import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

declare global {
  interface Window {
    tronWeb?: any;
  }
}

const WalletConnection = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const { user, updateWallet } = useAuth();

  const connectTronWallet = async () => {
    setIsConnecting(true);
    
    try {
      if (typeof window.tronWeb === 'undefined') {
        toast({
          variant: 'destructive',
          title: 'TronLink Not Found',
          description: 'Please install TronLink wallet extension to continue.',
        });
        return;
      }

      if (!window.tronWeb.ready) {
        toast({
          variant: 'destructive',
          title: 'TronLink Not Ready',
          description: 'Please unlock your TronLink wallet and try again.',
        });
        return;
      }

      const address = window.tronWeb.defaultAddress.base58;
      
      if (!address) {
        toast({
          variant: 'destructive',
          title: 'No Address Found',
          description: 'Please make sure TronLink is properly connected.',
        });
        return;
      }

      await updateWallet(address);
      
      toast({
        title: 'Wallet Connected',
        description: `Successfully connected to ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
      });
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast({
        variant: 'destructive',
        title: 'Connection Failed',
        description: 'Failed to connect wallet. Please try again.',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      await updateWallet('');
      toast({
        title: 'Wallet Disconnected',
        description: 'Your wallet has been disconnected successfully.',
      });
    } catch (error) {
      console.error('Wallet disconnection error:', error);
      toast({
        variant: 'destructive',
        title: 'Disconnection Failed',
        description: 'Failed to disconnect wallet. Please try again.',
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Wallet className="w-5 h-5" />
          Wallet Connection
        </CardTitle>
        <CardDescription>
          Connect your TRON wallet to start investing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {user?.walletAddress ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                Connected
              </Badge>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Connected Address:</p>
              <p className="font-mono text-sm bg-muted p-2 rounded">
                {user.walletAddress.substring(0, 6)}...{user.walletAddress.substring(user.walletAddress.length - 4)}
              </p>
            </div>
            
            <Button 
              onClick={disconnectWallet}
              variant="outline" 
              className="w-full"
            >
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                Not Connected
              </Badge>
            </div>
            
            <Button 
              onClick={connectTronWallet}
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? 'Connecting...' : 'Connect TronLink Wallet'}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Make sure you have TronLink installed and unlocked
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletConnection;