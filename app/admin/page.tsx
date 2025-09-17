import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Store,
  Users,
  TrendingUp,
  Star,
  Plus,
  Eye,
  Calendar,
  DollarSign,
  Activity,
} from "lucide-react";

export default function AdminDashboard() {
  // TODO:  SHOW DASHBOARD based on role - for admin and vendor separately
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Frame Finder Admin Panel</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/vendors">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+12 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+180 new users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">+0.3 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Vendor Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  vendor: "Tech Solutions Ltd",
                  action: "Profile Updated",
                  time: "2 hours ago",
                  status: "success",
                },
                {
                  vendor: "Creative Designs",
                  action: "New Registration",
                  time: "4 hours ago",
                  status: "new",
                },
                {
                  vendor: "Digital Services",
                  action: "Payment Received",
                  time: "6 hours ago",
                  status: "success",
                },
                {
                  vendor: "Print Solutions",
                  action: "Document Verification",
                  time: "1 day ago",
                  status: "pending",
                },
                {
                  vendor: "Frame Crafters",
                  action: "Rating Updated",
                  time: "2 days ago",
                  status: "info",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "new"
                          ? "bg-blue-500"
                          : activity.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium">{activity.vendor}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Approvals</span>
                <Badge variant="destructive">8</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">New Messages</span>
                <Badge variant="default">12</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Sessions</span>
                <Badge variant="secondary">45</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">System Health</span>
                <Badge variant="outline" className="text-green-600">
                  Excellent
                </Badge>
              </div>
              <div className="pt-4">
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/admin/vendors">
                    <Store className="h-4 w-4 mr-2" />
                    Manage Vendors
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
