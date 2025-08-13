import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';
import { 
  Palette, 
  Sun, 
  Moon, 
  Monitor, 
  Check, 
  Save,
  Type,
  Zap,
  Layout
} from 'lucide-react';

interface ThemeSettingsProps {
  showAdvanced?: boolean;
}

export default function ThemeSettings({ showAdvanced = true }: ThemeSettingsProps) {
  const { settings, updateSetting, saveSettings } = useTheme();
  const [saving, setSaving] = useState(false);

  // Color options with more choices than admin
  const colorOptions = [
    { value: 'blue', label: 'Blue', color: 'hsl(221, 83%, 53%)' },
    { value: 'green', label: 'Green', color: 'hsl(142, 76%, 36%)' },
    { value: 'purple', label: 'Purple', color: 'hsl(262, 83%, 58%)' },
    { value: 'orange', label: 'Orange', color: 'hsl(25, 95%, 53%)' },
    { value: 'red', label: 'Red', color: 'hsl(0, 84%, 60%)' },
    { value: 'pink', label: 'Pink', color: 'hsl(336, 75%, 60%)' },
    { value: 'indigo', label: 'Indigo', color: 'hsl(239, 84%, 67%)' },
    { value: 'teal', label: 'Teal', color: 'hsl(173, 80%, 40%)' },
    { value: 'cyan', label: 'Cyan', color: 'hsl(188, 86%, 53%)' },
    { value: 'emerald', label: 'Emerald', color: 'hsl(160, 84%, 39%)' },
    { value: 'lime', label: 'Lime', color: 'hsl(84, 81%, 44%)' },
    { value: 'amber', label: 'Amber', color: 'hsl(43, 96%, 56%)' },
  ];

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveSettings();
      toast.success('Theme settings saved successfully!');
    } catch (error) {
      console.error('Error saving theme settings:', error);
      toast.error('Failed to save theme settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme & Appearance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Selection */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Color Theme</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant={settings.theme === 'light' ? 'default' : 'outline'}
                className="flex flex-col items-center gap-2 h-auto p-3 sm:p-4"
                onClick={() => updateSetting('theme', 'light')}
              >
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Light</span>
                {settings.theme === 'light' && <Check className="h-3 w-3 sm:h-4 sm:w-4" />}
              </Button>
              <Button
                variant={settings.theme === 'dark' ? 'default' : 'outline'}
                className="flex flex-col items-center gap-2 h-auto p-3 sm:p-4"
                onClick={() => updateSetting('theme', 'dark')}
              >
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Dark</span>
                {settings.theme === 'dark' && <Check className="h-3 w-3 sm:h-4 sm:w-4" />}
              </Button>
              <Button
                variant={settings.theme === 'system' ? 'default' : 'outline'}
                className="flex flex-col items-center gap-2 h-auto p-3 sm:p-4"
                onClick={() => updateSetting('theme', 'system')}
              >
                <Monitor className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">System</span>
                {settings.theme === 'system' && <Check className="h-3 w-3 sm:h-4 sm:w-4" />}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Primary Color Selection */}
          <div className="space-y-2">
            <Label>Primary Color</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {colorOptions.map((color) => (
                <Button
                  key={color.value}
                  variant={settings.primaryColor === color.value ? 'default' : 'outline'}
                  className="flex items-center gap-2 h-auto p-2 sm:p-3"
                  onClick={() => updateSetting('primaryColor', color.value)}
                >
                  <div 
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-border flex-shrink-0"
                    style={{ backgroundColor: color.color }}
                  />
                  <span className="text-xs sm:text-sm flex-1 text-left">{color.label}</span>
                  {settings.primaryColor === color.value && <Check className="h-3 w-3 sm:h-4 sm:w-4 ml-auto flex-shrink-0" />}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {showAdvanced && (
          <>
            <Separator />

            {/* Display Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Display Settings
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="font-size" className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Font Size
                  </Label>
                  <Select 
                    value={settings.fontSize} 
                    onValueChange={(value: 'small' | 'medium' | 'large') => updateSetting('fontSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="flex items-center gap-2">
                      <Layout className="h-4 w-4" />
                      Compact Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing and padding for more content</p>
                  </div>
                  <Switch 
                    checked={settings.compactMode} 
                    onCheckedChange={(checked) => updateSetting('compactMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Animations
                    </Label>
                    <p className="text-sm text-muted-foreground">Enable smooth transitions and effects</p>
                  </div>
                  <Switch 
                    checked={settings.animationsEnabled} 
                    onCheckedChange={(checked) => updateSetting('animationsEnabled', checked)}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="min-w-[120px]"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Theme'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
