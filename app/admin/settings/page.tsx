"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Database,
  Mail,
  Phone,
  Globe,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Upload,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SettingsData {
  general: {
    siteName: string
    siteDescription: string
    contactEmail: string
    contactPhone: string
    timezone: string
    currency: string
    language: string
    maintenanceMode: boolean
  }
  notifications: {
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    applicationUpdates: boolean
    systemAlerts: boolean
    marketingEmails: boolean
    weeklyReports: boolean
    monthlyReports: boolean
  }
  security: {
    twoFactorAuth: boolean
    sessionTimeout: number
    passwordExpiry: number
    ipWhitelist: string
    maxLoginAttempts: number
    requireStrongPasswords: boolean
    auditLogging: boolean
  }
  integrations: {
    emailProvider: string
    emailApiKey: string
    smsProvider: string
    smsApiKey: string
    storageProvider: string
    storageApiKey: string
    analyticsProvider: string
    analyticsApiKey: string
  }
  appearance: {
    theme: string
    primaryColor: string
    secondaryColor: string
    logoUrl: string
    faviconUrl: string
    customCss: string
    showBranding: boolean
  }
}

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<SettingsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock settings data
      const mockSettings: SettingsData = {
        general: {
          siteName: "Home Online",
          siteDescription: "Australia's leading mortgage broker platform",
          contactEmail: "support@homeonline.com",
          contactPhone: "+61 1800 123 456",
          timezone: "Australia/Sydney",
          currency: "AUD",
          language: "en-AU",
          maintenanceMode: false,
        },
        notifications: {
          emailNotifications: true,
          smsNotifications: true,
          pushNotifications: false,
          applicationUpdates: true,
          systemAlerts: true,
          marketingEmails: false,
          weeklyReports: true,
          monthlyReports: true,
        },
        security: {
          twoFactorAuth: true,
          sessionTimeout: 24,
          passwordExpiry: 90,
          ipWhitelist: "192.168.1.0/24\n10.0.0.0/8",
          maxLoginAttempts: 5,
          requireStrongPasswords: true,
          auditLogging: true,
        },
        integrations: {
          emailProvider: "sendgrid",
          emailApiKey: "SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          smsProvider: "twilio",
          smsApiKey: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          storageProvider: "aws-s3",
          storageApiKey: "AKIAxxxxxxxxxxxxxxxx",
          analyticsProvider: "google",
          analyticsApiKey: "GA-xxxxxxxx-x",
        },
        appearance: {
          theme: "light",
          primaryColor: "#2563eb",
          secondaryColor: "#64748b",
          logoUrl: "/images/logo.png",
          faviconUrl: "/images/favicon.ico",
          customCss:
            "/* Custom styles */\n.custom-header {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}",
          showBranding: true,
        },
      }

      setSettings(mockSettings)
      setLoading(false)
    }

    fetchSettings()
  }, [])

  const handleSave = async (section: keyof SettingsData) => {
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Settings Saved",
      description: `${section.charAt(0).toUpperCase() + section.slice(1)} settings have been updated successfully.`,
    })

    setSaving(false)
  }

  const toggleApiKeyVisibility = (key: string) => {
    setShowApiKeys((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const maskApiKey = (key: string) => {
    if (!key) return ""
    return key.substring(0, 8) + "x".repeat(Math.max(0, key.length - 8))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading Settings...</h1>
          <p className="text-gray-500">Fetching system configuration</p>
        </div>
      </div>
    )
  }

  if (!settings) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
              <p className="text-gray-600 mt-1">Configure system preferences and integrations</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="bg-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" disabled={saving}>
                {saving ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save All
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-1">
            <TabsList className="grid w-full grid-cols-5 bg-gray-50">
              <TabsTrigger value="general" className="data-[state=active]:bg-white">
                <Settings className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-white">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-white">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="integrations" className="data-[state=active]:bg-white">
                <Database className="h-4 w-4 mr-2" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="appearance" className="data-[state=active]:bg-white">
                <Palette className="h-4 w-4 mr-2" />
                Appearance
              </TabsTrigger>
            </TabsList>
          </div>

          {/* General Settings */}
          <TabsContent value="general">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.general.siteName}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, siteName: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, contactEmail: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.general.siteDescription}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, siteDescription: e.target.value },
                      })
                    }
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={settings.general.contactPhone}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, contactPhone: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={settings.general.timezone}
                      onValueChange={(value) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, timezone: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>
                        <SelectItem value="Australia/Melbourne">Australia/Melbourne</SelectItem>
                        <SelectItem value="Australia/Brisbane">Australia/Brisbane</SelectItem>
                        <SelectItem value="Australia/Perth">Australia/Perth</SelectItem>
                        <SelectItem value="Australia/Adelaide">Australia/Adelaide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={settings.general.currency}
                      onValueChange={(value) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, currency: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-gray-600">Enable maintenance mode to restrict access</p>
                  </div>
                  <Switch
                    checked={settings.general.maintenanceMode}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, maintenanceMode: checked },
                      })
                    }
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave("general")} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    Save General Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Communication Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={settings.notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, emailNotifications: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        checked={settings.notifications.smsNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, smsNotifications: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-gray-600">Receive browser push notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.pushNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, pushNotifications: checked },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Application Updates</Label>
                        <p className="text-sm text-gray-600">Notifications about application status changes</p>
                      </div>
                      <Switch
                        checked={settings.notifications.applicationUpdates}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, applicationUpdates: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>System Alerts</Label>
                        <p className="text-sm text-gray-600">Critical system notifications and alerts</p>
                      </div>
                      <Switch
                        checked={settings.notifications.systemAlerts}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, systemAlerts: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-gray-600">Promotional and marketing communications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.marketingEmails}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, marketingEmails: checked },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Reports</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-gray-600">Weekly performance and analytics reports</p>
                      </div>
                      <Switch
                        checked={settings.notifications.weeklyReports}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, weeklyReports: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Monthly Reports</Label>
                        <p className="text-sm text-gray-600">Monthly summary and insights reports</p>
                      </div>
                      <Switch
                        checked={settings.notifications.monthlyReports}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, monthlyReports: checked },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave("notifications")} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Security Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Security settings affect all users. Changes will take effect immediately.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Authentication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
                      </div>
                      <Switch
                        checked={settings.security.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            security: { ...settings.security, twoFactorAuth: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Strong Password Requirements</Label>
                        <p className="text-sm text-gray-600">Enforce complex password policies</p>
                      </div>
                      <Switch
                        checked={settings.security.requireStrongPasswords}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            security: { ...settings.security, requireStrongPasswords: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Audit Logging</Label>
                        <p className="text-sm text-gray-600">Log all administrative actions</p>
                      </div>
                      <Switch
                        checked={settings.security.auditLogging}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            security: { ...settings.security, auditLogging: checked },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          security: { ...settings.security, sessionTimeout: Number.parseInt(e.target.value) || 24 },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      value={settings.security.passwordExpiry}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          security: { ...settings.security, passwordExpiry: Number.parseInt(e.target.value) || 90 },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          security: { ...settings.security, maxLoginAttempts: Number.parseInt(e.target.value) || 5 },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                  <Textarea
                    id="ipWhitelist"
                    value={settings.security.ipWhitelist}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: { ...settings.security, ipWhitelist: e.target.value },
                      })
                    }
                    placeholder="Enter IP addresses or CIDR blocks, one per line"
                    rows={4}
                  />
                  <p className="text-sm text-gray-600">Leave empty to allow access from any IP address</p>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave("security")} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Settings */}
          <TabsContent value="integrations">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Third-Party Integrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Database className="h-4 w-4" />
                  <AlertDescription>
                    API keys are encrypted and stored securely. Test connections after updating.
                  </AlertDescription>
                </Alert>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Provider
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emailProvider">Provider</Label>
                        <Select
                          value={settings.integrations.emailProvider}
                          onValueChange={(value) =>
                            setSettings({
                              ...settings,
                              integrations: { ...settings.integrations, emailProvider: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sendgrid">SendGrid</SelectItem>
                            <SelectItem value="mailgun">Mailgun</SelectItem>
                            <SelectItem value="ses">Amazon SES</SelectItem>
                            <SelectItem value="postmark">Postmark</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emailApiKey">API Key</Label>
                        <div className="relative">
                          <Input
                            id="emailApiKey"
                            type={showApiKeys.email ? "text" : "password"}
                            value={
                              showApiKeys.email
                                ? settings.integrations.emailApiKey
                                : maskApiKey(settings.integrations.emailApiKey)
                            }
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                integrations: { ...settings.integrations, emailApiKey: e.target.value },
                              })
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleApiKeyVisibility("email")}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                          >
                            {showApiKeys.email ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      SMS Provider
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="smsProvider">Provider</Label>
                        <Select
                          value={settings.integrations.smsProvider}
                          onValueChange={(value) =>
                            setSettings({
                              ...settings,
                              integrations: { ...settings.integrations, smsProvider: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="twilio">Twilio</SelectItem>
                            <SelectItem value="messagebird">MessageBird</SelectItem>
                            <SelectItem value="nexmo">Vonage (Nexmo)</SelectItem>
                            <SelectItem value="clicksend">ClickSend</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smsApiKey">API Key</Label>
                        <div className="relative">
                          <Input
                            id="smsApiKey"
                            type={showApiKeys.sms ? "text" : "password"}
                            value={
                              showApiKeys.sms
                                ? settings.integrations.smsApiKey
                                : maskApiKey(settings.integrations.smsApiKey)
                            }
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                integrations: { ...settings.integrations, smsApiKey: e.target.value },
                              })
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleApiKeyVisibility("sms")}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                          >
                            {showApiKeys.sms ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      Storage Provider
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="storageProvider">Provider</Label>
                        <Select
                          value={settings.integrations.storageProvider}
                          onValueChange={(value) =>
                            setSettings({
                              ...settings,
                              integrations: { ...settings.integrations, storageProvider: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aws-s3">Amazon S3</SelectItem>
                            <SelectItem value="google-cloud">Google Cloud Storage</SelectItem>
                            <SelectItem value="azure">Azure Blob Storage</SelectItem>
                            <SelectItem value="digitalocean">DigitalOcean Spaces</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="storageApiKey">API Key</Label>
                        <div className="relative">
                          <Input
                            id="storageApiKey"
                            type={showApiKeys.storage ? "text" : "password"}
                            value={
                              showApiKeys.storage
                                ? settings.integrations.storageApiKey
                                : maskApiKey(settings.integrations.storageApiKey)
                            }
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                integrations: { ...settings.integrations, storageApiKey: e.target.value },
                              })
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleApiKeyVisibility("storage")}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                          >
                            {showApiKeys.storage ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Analytics Provider
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="analyticsProvider">Provider</Label>
                        <Select
                          value={settings.integrations.analyticsProvider}
                          onValueChange={(value) =>
                            setSettings({
                              ...settings,
                              integrations: { ...settings.integrations, analyticsProvider: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="google">Google Analytics</SelectItem>
                            <SelectItem value="mixpanel">Mixpanel</SelectItem>
                            <SelectItem value="amplitude">Amplitude</SelectItem>
                            <SelectItem value="segment">Segment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="analyticsApiKey">Tracking ID</Label>
                        <div className="relative">
                          <Input
                            id="analyticsApiKey"
                            type={showApiKeys.analytics ? "text" : "password"}
                            value={
                              showApiKeys.analytics
                                ? settings.integrations.analyticsApiKey
                                : maskApiKey(settings.integrations.analyticsApiKey)
                            }
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                integrations: { ...settings.integrations, analyticsApiKey: e.target.value },
                              })
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleApiKeyVisibility("analytics")}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                          >
                            {showApiKeys.analytics ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Test Connections</Button>
                  <Button onClick={() => handleSave("integrations")} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Integration Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Appearance & Branding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Theme Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select
                        value={settings.appearance.theme}
                        onValueChange={(value) =>
                          setSettings({
                            ...settings,
                            appearance: { ...settings.appearance, theme: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto (System)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={settings.appearance.primaryColor}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              appearance: { ...settings.appearance, primaryColor: e.target.value },
                            })
                          }
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          value={settings.appearance.primaryColor}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              appearance: { ...settings.appearance, primaryColor: e.target.value },
                            })
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={settings.appearance.secondaryColor}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              appearance: { ...settings.appearance, secondaryColor: e.target.value },
                            })
                          }
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          value={settings.appearance.secondaryColor}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              appearance: { ...settings.appearance, secondaryColor: e.target.value },
                            })
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Branding</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="logoUrl">Logo URL</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="logoUrl"
                          value={settings.appearance.logoUrl}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              appearance: { ...settings.appearance, logoUrl: e.target.value },
                            })
                          }
                          placeholder="/images/logo.png"
                        />
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="faviconUrl">Favicon URL</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="faviconUrl"
                          value={settings.appearance.faviconUrl}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              appearance: { ...settings.appearance, faviconUrl: e.target.value },
                            })
                          }
                          placeholder="/images/favicon.ico"
                        />
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Show Branding</Label>
                      <p className="text-sm text-gray-600">Display "Powered by Home Online" branding</p>
                    </div>
                    <Switch
                      checked={settings.appearance.showBranding}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, showBranding: checked },
                        })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Custom CSS</h3>
                  <div className="space-y-2">
                    <Label htmlFor="customCss">Custom Styles</Label>
                    <Textarea
                      id="customCss"
                      value={settings.appearance.customCss}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, customCss: e.target.value },
                        })
                      }
                      placeholder="/* Add your custom CSS here */"
                      rows={8}
                      className="font-mono text-sm"
                    />
                    <p className="text-sm text-gray-600">Custom CSS will be applied globally. Use with caution.</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave("appearance")} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Appearance Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
