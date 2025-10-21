import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-131307ce/health", (c) => {
  return c.json({ status: "ok" });
});

// Save booking submission
app.post("/make-server-131307ce/bookings", async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate required fields
    if (!body.experienceTitle || !body.fullName || !body.email || !body.date || !body.guests) {
      return c.json({ 
        success: false, 
        error: "Missing required fields" 
      }, 400);
    }

    // Create booking object
    const booking = {
      experienceTitle: body.experienceTitle,
      fullName: body.fullName,
      email: body.email,
      date: body.date,
      guests: body.guests,
      specialRequests: body.specialRequests || "",
      timestamp: new Date().toISOString(),
      status: "pending"
    };

    // Generate a unique key for this booking
    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Save to KV store
    await kv.set(bookingId, booking);

    console.log(`Booking saved successfully: ${bookingId}`);
    
    return c.json({ 
      success: true, 
      bookingId,
      message: "Booking submitted successfully" 
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    return c.json({ 
      success: false, 
      error: "Failed to save booking" 
    }, 500);
  }
});

// Get all bookings
app.get("/make-server-131307ce/bookings", async (c) => {
  try {
    // Get all bookings with the "booking_" prefix
    const bookings = await kv.getByPrefix("booking_");
    
    return c.json({ 
      success: true, 
      bookings,
      count: bookings.length
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return c.json({ 
      success: false, 
      error: "Failed to fetch bookings" 
    }, 500);
  }
});

Deno.serve(app.fetch);