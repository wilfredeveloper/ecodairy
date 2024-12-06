import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import FeedRecommendations from './feed-reccomendations';
import { Cow } from '@/lib/mock-data-generator';

interface CowSelectionAndFeedProps {
  cowsData: Cow[];
}

const CowSelectionAndFeed: React.FC<CowSelectionAndFeedProps> = ({ cowsData }) => {
  const [selectedCow, setSelectedCow] = useState("all");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    // Simulate optimization calculation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsOptimizing(false);
    setShowDialog(true);
  };

  return (
    <div className="grid grid-cols-1 gap-4 mb-6">
      {/* Cow Selection Dropdown */}
      <Card>
        <CardHeader>
          <CardTitle>My Cows</CardTitle>
          <CardDescription>
            Select a cow to view detailed data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedCow} onValueChange={setSelectedCow}>
            <SelectTrigger className="w-[12rem]">
              <SelectValue placeholder="Select a cow" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cows</SelectItem>
              {cowsData.map((cow) => (
                <SelectItem key={cow.id} value={cow.id.toString()}>
                  {cow.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={handleOptimize} 
            disabled={isOptimizing}
            className="w-[12rem]"
          >
            {isOptimizing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              'Optimize Feed'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Feed Recommendations Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto z-50">
          <DialogHeader>
            <DialogTitle>Optimized Feed Recommendations</DialogTitle>
            <DialogDescription>
              Customized recommendations for {selectedCow === "all" ? "all cows" : 
                cowsData.find(cow => cow.id === Number(selectedCow))?.name}
            </DialogDescription>
          </DialogHeader>
          <FeedRecommendations 
            selectedCow={selectedCow} 
            cowsData={cowsData}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CowSelectionAndFeed;