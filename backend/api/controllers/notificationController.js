// ./controllers/notificationController.js
import Notification from '../models/Notification.js'; // default export from model

// GET all notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ order: [['time', 'DESC']] });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE notification
export const createNotification = async (req, res) => {
  try {
    const io = req.app.get("io");
    const noti = await Notification.create(req.body);

    io.emit("new-notification", noti);

    res.status(201).json(noti);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// MARK as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const noti = await Notification.findByPk(id);

    if (!noti) return res.status(404).json({ error: "Not found" });

    noti.read = true;
    await noti.save();

    res.json(noti);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE notification by ID
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const noti = await Notification.findByPk(id);
    if (!noti) {
      return res.status(404).json({ error: "Notification not found" });
    }

    await noti.destroy();

    res.json({ message: "Notification deleted successfully", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
